import React from 'react'
import './reminder.css'
import Drawer from '../components/Drawer'
//icons
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';



const Reminder = ({activeDrawer,setactiveDrawer}) => {
  const[toggleModal,settoggleModal] = React.useState(false)
  const[date,setdate] = React.useState("")
  const[time,settime] = React.useState("")
  const[task,settask] = React.useState("")
  const[taskList,settaskList] = React.useState([])
  
  // setInterval(() => {
  //   let d = new Date()
  //   let timeNow = d.getHours() + ":" + d.getMinutes()
  //   if (timeNow == "17:54") {
  //     console.log("nooo")
      
  //   }
  // }, 1000);


  const handleTaskCreate=(e)=>{
    e.preventDefault()
    console.log(date,time,task)
    let newTask = {
      "date":date,
      "time":time,
      "task":task
    }
    settaskList([...taskList,newTask])
    settoggleModal(false)
  }

  const handleModal = ()=>{
    setdate("")
    settime("")
    settask("")
    settoggleModal(true)
  }

  const handleDeleteTask = (task)=>{
    let filteredlist = taskList.filter((item)=>item.task !== task )
    settaskList(filteredlist)
  }


  return (
    <div className='reminder_container'>
      <div className="reminder_header">
            <PersonIcon style={{width:"40px",height:"40px",color:"white",marginLeft:"0.5em"}}/>
            <p className="header_title">Reminder</p>
        </div>
        {/* task list */}
        {!toggleModal &&  <div className='reminder_list'>
          {taskList.length > 0 ? taskList.map((item,id)=>(
            <div className='task_body'>
              <p className='task_close' onClick={()=>handleDeleteTask(item.task)}>❌</p>
              <p className='task_text'>{item.task}</p>
              <p className='task_time'>{item.time}</p>
            </div>
          )):<div>
              no task scheduled
            </div>}
        </div>}
        <div className={toggleModal ?"reminder_modal":"reminder_modal_hide" }>
          <form onSubmit={handleTaskCreate}>
              {/* date time  */}
            <div className='date_time_holder'>
              <input type='date' value={date} onChange={(e)=>setdate(e.target.value)} placeholder='Select Date'/>
              <input type='time' value={time} onChange={(e)=>settime(e.target.value)} placeholder='Select Time'/>
            </div>
            {/* textfield */}
            <div className='text_holder'>
              <input type='text' value={task} onChange={((e)=>settask(e.target.value))} placeholder='Enter Task'/>
            </div>
            {/* btn */}
            <div className='button_holder'>
              <button onClick={(e)=>{e.preventDefault();settoggleModal(false)}}>Close</button>
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
        <div className='add_reminder' onClick={handleModal}>
          <EditNoteIcon className='add_icon' style={{width:"50px",height:"50px"}}/>
        </div>
        <div className="drawer_holder">
          <Drawer activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer}/>
        </div>
    </div>
  )
}

export default Reminder