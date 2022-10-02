

//hi@stepbrobd.com

type Props = {
    tenQueriedList : any
  };
  
  const TwitterTable = (props:Props) =>{
      var tabCount = props.tenQueriedList.length

      var tenTabList = 
    
    //Iterate and create x amount of tabs given stock info
    return (
        <>
        {props.tenQueriedList}
    </>
    );
};


export default TwitterTable;