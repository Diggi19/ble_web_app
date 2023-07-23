import axios from 'axios';
import React, { useEffect } from 'react';
import addNotification from 'react-push-notification';

const TaskNotification = ({ data,settaskList,taskList,characteristicCache }) => {
  function send(data) {
    data = String(data);

    if (!data || !characteristicCache) {
      console.log("no characteristics")
      return;
    }
    console.log("sending")
    writeToCharacteristic(characteristicCache, data);
  }
  function writeToCharacteristic(characteristic, data) {
    console.log("writing")
    characteristic.writeValue(new TextEncoder().encode(data));
  }

  useEffect(() => {
    const checkTimeAndSendNotification = () => {
      const currentTime = new Date();
      const taskTime = new Date(data.remindAt);
    //   console.log(currentTime,taskTime)

      // Compare the current time with the task time
      if ((taskTime - currentTime) < 0) {
        // Send the notification
        // sendNotification();
        send("A")
        handleDeleteTask(data._id)
        clearInterval(intervalId);
      }
    };
    
    const sendNotification = () => {
      // Add your notification logic here
      // This could be an alert, a toast, or a push notification, depending on your application
        addNotification({
          title: 'Warning',
          subtitle: 'This is a subtitle',
          message: 'This is a very long message',
          theme: 'darkblue',
          native: true, // when using native, your OS will handle theming.
          duration:30000
          
        })
        
    };

    // Check the time every second
    const intervalId = setInterval(checkTimeAndSendNotification, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [data.reminderMsg, data.remindAt]);

  const handleDeleteTask = (id)=>{
    axios.delete(`https://attractive-gray-moth.cyclic.app/deleteReminder/${id}`)
        .then((result) => {
            console.log(result.data)
            settaskList(result.data)
        }).catch((err) => {
            console.log(err)
        });
  }
  return (
    <div className='task_body'>
              <p className='task_close' onClick={()=>handleDeleteTask(data._id)}>❌</p>
              <p className='task_text'>{data.reminderMsg}</p>
              <p className='task_time'>{data.time}</p>
    </div>
  )
};

export default TaskNotification;