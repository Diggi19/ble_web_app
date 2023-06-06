import React from 'react'
import Drawer from '../components/Drawer'
import './about.css'
//icons
import PersonIcon from '@mui/icons-material/Person';

const About = ({activeDrawer,setactiveDrawer}) => {
  return (
    <div className='about_container'>
      <div className="about_header">
            <PersonIcon style={{width:"40px",height:"40px",color:"white",marginLeft:"0.5em"}}/>
            <p className="header_title">About</p>
        </div>
      <div className='info_holder'>

      </div>
      <div className="drawer_holder">
                <Drawer activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer}/>
          </div>
    </div>
  )
}

export default About