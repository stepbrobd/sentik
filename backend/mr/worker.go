package mr

import "fmt"
import "log"
import "net/rpc"
import "hash/fnv"
import "os"
import "encoding/json"
import "sort"

//
// Map functions return a slice of KeyValue.
//
type KeyValue struct {
	Key   string
	Value string
}

// for sorting by key.
type ByKey []KeyValue

// for sorting by key.
func (a ByKey) Len() int           { return len(a) }
func (a ByKey) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByKey) Less(i, j int) bool { return a[i].Key < a[j].Key }

//
// use ihash(key) % NReduce to choose the reduce
// task number for each KeyValue emitted by Map.
//
func ihash(key string) int {
	h := fnv.New32a()
	h.Write([]byte(key))
	return int(h.Sum32() & 0x7fffffff)
}

//Calls UpdateTask Coordinator RPC
func updateTask(tid int, phase Phase, ok bool) {
	args := UpdateTaskArgs{
		Tid: tid,
        Phase: phase,
		Ok:  ok,
	}
	reply := UpdateTaskReply{}
	if ok := call("Coordinator.UpdateTask", &args, &reply); !ok {
		log.Println("Error Updating Worker Task!")
	}
}

//Calls GetTask Coordinator RPC
func getTask() Task {
	args := GetTaskArgs{}
	t := Task{}
	if ok := call("Coordinator.GetTask", &args, &t); !ok {
		log.Println("Error Getting Task!")
        t.Tid = -1
	}
	return t
}

//Performs Mapping function
func mapper(t Task, mapf func(string, string) []KeyValue){
	content, err := os.ReadFile(t.File)
	if err != nil {
		updateTask(t.Tid, t.Phase, false)
		return
	}
	kva := mapf(t.File, string(content))
	//2d Matrix Maps x Reduces, to generate files
	M_R := make([][]KeyValue, t.R)
	for _, kv := range kva {
		bucket := ihash(kv.Key) % t.R
		M_R[bucket] = append(M_R[bucket], kv)
	}
	for bucket, kvl := range M_R {
        file, err := os.CreateTemp("./", "temp-")
        if err != nil {
            updateTask(t.Tid, t.Phase, false)
            return
        }
		enc := json.NewEncoder(file)
		for _, kv := range kvl {
			if err := enc.Encode(&kv); err != nil {
				updateTask(t.Tid, t.Phase, false)
				return
			}
		}
        if err := os.Rename(file.Name(), fmt.Sprintf("mr-%v-%v", t.Tid, bucket)); err != nil {
            updateTask(t.Tid, t.Phase, false)
            return
        }
        file.Close()
	}
	updateTask(t.Tid, t.Phase, true)
}

//Performs Reduce function
func reducer(t Task, reducef func(string, []string) string){
	//Read and put pairs into map
	k_list := make(map[string][]string)
	for m := 0; m < t.M; m++ {
		file, err := os.Open(fmt.Sprintf("mr-%v-%v", m, t.Tid))
		if err != nil {
			updateTask(t.Tid, t.Phase, false)
			return
		}
		dec := json.NewDecoder(file)
		for {
			var kv KeyValue
			if err := dec.Decode(&kv); err != nil {
				break
			}
			k_list[kv.Key] = append(k_list[kv.Key], kv.Value)
		}
	}

	//Convert to KeyValue sorted list
	reduced := []KeyValue{}
	for k, l := range k_list {
		reduced = append(reduced, KeyValue{Key: k, Value: reducef(k, l)})
	}
	sort.Sort(ByKey(reduced))

	//Write output
    ofile, err := os.CreateTemp("./", "temp-")
	if err != nil {
		updateTask(t.Tid, t.Phase, false)
		return
	}
	for _, kv := range reduced {
		fmt.Fprintf(ofile, "%v %v\n", kv.Key, kv.Value)
	}
    if err := os.Rename(ofile.Name(), fmt.Sprintf("mr-out-%v", t.Tid)); err != nil {
        updateTask(t.Tid, t.Phase, false)
        return
    }
    ofile.Close()
	updateTask(t.Tid, t.Phase, true)
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: mrworker xxx.so\n")
		os.Exit(1)
	}

	mapf, reducef := loadPlugin(os.Args[1])

	Worker(mapf, reducef)
}

//
// load the application Map and Reduce functions
// from a plugin file, e.g. ../mrapps/wc.so
//
func loadPlugin(filename string) (func(string, string) []mr.KeyValue, func(string, []string) string) {
	p, err := plugin.Open(filename)
	if err != nil {
		log.Fatalf("cannot load plugin %v", filename)
	}
	xmapf, err := p.Lookup("Map")
	if err != nil {
		log.Fatalf("cannot find Map in %v", filename)
	}
	mapf := xmapf.(func(string, string) []mr.KeyValue)
	xreducef, err := p.Lookup("Reduce")
	if err != nil {
		log.Fatalf("cannot find Reduce in %v", filename)
	}
	reducef := xreducef.(func(string, []string) string)

	return mapf, reducef
}

func Worker(mapf func(string, string) []KeyValue,
reducef func(string, []string) string) {
    //Infinite loop, request Task -> do Task
	for {
		task := getTask()
        for task.Tid == -1 {
            task = getTask()
        }
		if task.Die {
			os.Exit(0)
		} else if task.Phase == Map {
			mapper(task, mapf)
		} else if task.Phase == Reduce {
			reducer(task, reducef)
		}
	}
}

//
// send an RPC request to the coordinator, wait for the response.
// usually returns true.
// returns false if something goes wrong.
//
func call(rpcname string, args interface{}, reply interface{}) bool {
	// c, err := rpc.DialHTTP("tcp", "127.0.0.1"+":1234")
	sockname := coordinatorSock()
	c, err := rpc.DialHTTP("unix", sockname)
	if err != nil {
		log.Fatal("dialing:", err)
	}
	defer c.Close()

	err = c.Call(rpcname, args, reply)
	if err == nil {
		return true
	}

	fmt.Println(err)
	return false
}
