import axios from 'axios';
import React, { useEffect } from 'react';

const TaskNotification = ({ data,settaskList,taskList }) => {
  useEffect(() => {
    const checkTimeAndSendNotification = () => {
      const currentTime = new Date();
      const taskTime = new Date(data.remindAt);
    //   console.log(currentTime,taskTime)

      // Compare the current time with the task time
      if ((taskTime - currentTime) < 0) {
        // Send the notification
        sendNotification();
      }
    };

    const sendNotification = () => {
      // Add your notification logic here
      // This could be an alert, a toast, or a push notification, depending on your application
      new Notification("Welcome to buddy chair", {
            icon: "https://cdn.pixabay.com/photo/2017/05/15/21/58/drug-icon-2316244_960_720.png",
            body: data.reminderMsg
        })
      handleDeleteTask(data.reminderMsg)

      console.log(`It's time for the task: ${data.reminderMsg}`);
        console.log(taskList)
      clearInterval(intervalId);
    };

    // Check the time every second
    const intervalId = setInterval(checkTimeAndSendNotification, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [data.reminderMsg, data.remindAt]);

  const handleDeleteTask = (task)=>{
    axios.delete(`https://attractive-gray-moth.cyclic.app/deleteReminder/${data._id}`)
        .then((result) => {
            console.log(result.data)
            settaskList(result.data)
        }).catch((err) => {
            console.log(err)
        });
  }
  return (
    <div className='task_body'>
              <p className='task_close' onClick={()=>handleDeleteTask(item.task)}>❌</p>
              <p className='task_text'>{data.reminderMsg}</p>
              <p className='task_time'>{data.time}</p>
    </div>
  )
};

export default TaskNotification;