import "./AddTask.css"
import React,{useState} from "react"

const AddTask = ({sendTask})=>
{
    const [submit,setSubmit] = useState("Add Task")
    const [task,setTask] = useState("");

    const handleChange = (event)=>setTask(event.target.value)
    

    const handleSubmit = async(event)=>
    {
        if(task.trim().length>0)
        {
            setSubmit("Sending...")
            event.preventDefault();
            await(sendTask({text:task}))
            setSubmit("Add Task")
            
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="view">
            <input type="text"  value={task} onChange={handleChange} placeholder = "Enter Task here"/>
            <button type="submit">{submit}</button>
        </form>
    )
}

export default React.memo(AddTask) 