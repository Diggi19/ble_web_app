import React from 'react'
import './drawer.css'
import HomeIcon from '@mui/icons-material/Home';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
const Drawer = ({activeDrawer,setactiveDrawer}) => {
    console.log(activeDrawer)
  return (
    <div className='drawer_container'>
        <Link className='icon_holder' to={"/"} onClick={()=>setactiveDrawer("home")}>
            <HomeIcon className={activeDrawer === "home"?"icon_active":"icon"} style={{width:"40px",height:"40px"}}/>
        </Link>
        <Link className='icon_holder' to={"/reminder"} onClick={()=>setactiveDrawer("reminder")}>
            <AddAlarmIcon className={activeDrawer === "reminder" ? "icon_active":"icon"} style={{width:"40px",height:"40px"}}/>
        </Link>
        <Link className='icon_holder'to={"/about"} onClick={()=>setactiveDrawer("about")}>
            <InfoIcon className={activeDrawer === "about"?"icon_active":"icon"} style={{width:"40px",height:"40px"}}/>
        </Link>
    </div>
  )
}

export default Drawer
