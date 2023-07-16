import React, { useEffect } from 'react'
// import {messaging} from '../firebase'
// import {getToken} from 'firebase/messaging'
import './reminder.css'
import Drawer from '../components/Drawer'
//icons
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import TaskNotification from '../components/TaskNotification';



const Reminder = ({activeDrawer,setactiveDrawer}) => {
  const[toggleModal,settoggleModal] = React.useState(false)
  const[date,setdate] = React.useState("")
  const[time,settime] = React.useState("")
  const[task,settask] = React.useState("")
  const[taskList,settaskList] = React.useState([])
  const[isTokenFound,setTokenFound] = React.useState(false)
  
  // notification
  // const requestPermisiion = async()=>{
  //   const permisiion = await Notification.requestPermission()
  //   if (permisiion === "granted") {
  //     // generate token
  //     const token = await getToken(messaging,{vapidKey:"BEYOX73u8I3Z4HqlxbAzVLtcwGEWeRKxD_FBxgNLX643RtCx1wqRWiIRVc_e0U2ftjCsbS4ETtIxFh9JFQ477Uk"})
  //     console.log("token generated",token)

  //   }else if (permisiion === "denied") {
  //     alert("you denied notification")
  //   }
  // }
  // useEffect(()=>{
  //   requestPermisiion()
  // },[])
  

  // setInterval(() => {
  //   let d = new Date()
  //   let timeNow = d.getHours() + ":" + d.getMinutes()
  //   if (timeNow == "17:54") {
  //     console.log("nooo")
      
  //   }
  // }, 1000);

  // implementing firebase notification


  // implementing notification using node js
  // let count = 0
  // if (count != 2) {
  //   setInterval(() => {
  //     axios.get("http://localhost:5000/notificationCheck")
  //       .then((result) => {
  //         console.log(result)
  //         count +=1
  //       }).catch((err) => {
  //         console.log(err)      
  //       });
  //     // new Notification("Welcome to buddy chair", {
  //     //   icon: "https://cdn.pixabay.com/photo/2017/05/15/21/58/drug-icon-2316244_960_720.png",
  //     //   body: "Hello user we are glad to have you on board."
  //     // })
  //   }, 8000);
    
  // } else{
  //   console.log("entry over")
  // }

  // implementing notification using localstorage


  const handleTaskCreate=(e)=>{
    e.preventDefault()
    // console.log(date,time,task)
    const formattedDateTime = date + " " + time
    axios.post("https://attractive-gray-moth.cyclic.app/addReminder",{reminderMsg:task,time:time,remindAt:formattedDateTime})
      .then((result) => {
        console.log(result)
        getData()
      }).catch((err) => {
        console.log(err)
      });
    settoggleModal(false)
  }

  const handleModal = ()=>{
    setdate("")
    settime("")
    settask("")
    settoggleModal(true)
  }

  const getData = ()=>{
    axios.get("https://attractive-gray-moth.cyclic.app/allReminders")
      .then((result) => {
        settaskList(result.data)
      }).catch((err) => {
        console.log(err)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    if (taskList.length > 0) {
      console.log(taskList)
    }
  },[])

  console.log(taskList)
  return (
    <div className='reminder_container'>
      <div className="reminder_header">
            <PersonIcon style={{width:"40px",height:"40px",color:"white",marginLeft:"0.5em"}}/>
            <p className="header_title">Reminder</p>
        </div>
        {/* task list */}
        {!toggleModal &&  <div className='reminder_list'>
          {taskList.length > 0 ? taskList.map((item,id)=>(
            <TaskNotification data={item} settaskList={settaskList} taskList={taskList}/>
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




