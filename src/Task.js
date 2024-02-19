import "./Task.css"

const Task = ({task})=>
{
    return(
        <div className="task">
            <h1>{task}</h1>
        </div>
    )
}

export default Task;