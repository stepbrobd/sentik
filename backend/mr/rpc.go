package mr

// RPC definitions.

import "os"
import "strconv"

// Update struct that we use to update the Coordinator on Errors or finished work
type UpdateTaskArgs struct {
	Tid int
    Phase Phase
	Ok  bool
}

type UpdateTaskReply struct { }

type GetTaskArgs struct { }

// Cook up a unique-ish UNIX-domain socket name
func coordinatorSock() string {
	s := "/var/tmp/824-mr-"
	s += strconv.Itoa(os.Getuid())
	return s
}
