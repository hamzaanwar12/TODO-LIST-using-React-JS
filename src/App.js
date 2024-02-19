import AddTask from "./AddTask"
import Task from "./Task"
import "./App.css"
import {useState,useEffect,useCallback} from "react" 

function App() {

  const [taskList,setTaskList] = useState([])
  const [error,setError] = useState(null)

  const fetchTasks = 
  useCallback(
  async()=>
  {
      try{
        const tasks = await fetch("https://reacthttp-1b170-default-rtdb.firebaseio.com/tasks.json")
        
        if(!tasks.ok)
          throw new Error("Something Went Wrong")
    
        const list = []
        for(const x in tasks)
          list.push(tasks[x].taskText)

        console.log(list)
        setTaskList(list)
    }
    catch(error)
    {
      setError(error.message)
    }
  },[]) 



  const postTasks = useCallback(
    async(todo)=>
    {
        try{
          const tasks = await fetch("https://reacthttp-1b170-default-rtdb.firebaseio.com/tasks.json",{
            method:"POST",
            body: JSON.stringify(todo),
            header:{
              "Content-type": "application/json"
            }
          })
          
          if(!tasks.ok)
            throw new Error("Something Went Wrong")
          
          const reportedTasks = await tasks.json()
          console.log(reportedTasks)

          setTaskList((prevTaskList)=>prevTaskList.concat(todo))
      }
      catch(error)
      {
        console.log(error.message)
        setError(error.message)
      }
    },[])
  
  
  useEffect(()=>
  {
    fetchTasks()
  },[])
  
  let i = 0;
  let listedTasks = []
  if(taskList.length>0)
  {
    listedTasks = taskList.map(element => <Task key={++i} task = {element.text} />)
    console.log(listedTasks)
  }

  return (
    <>
    <AddTask sendTask = {postTasks}  receive = {fetchTasks}/>
    {taskList.length=== 0 && <div className="error"><h2>No Tasks Found</h2></div>}
    {error && <h1 style={{color:"red"}}>Errroe OCcured {error}</h1>}
    {taskList.length>0 && listedTasks}
    {/* <addTaskForm/> */}
    </>
  );
}

export default App;
