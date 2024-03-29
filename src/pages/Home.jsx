import React, { useContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import './home.css'
import Drawer from "../components/Drawer";
//icons
import PersonIcon from '@mui/icons-material/Person';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CancelIcon from '@mui/icons-material/Cancel';
import { BluetoothContext } from "../context";

function Home({ activeDrawer, setactiveDrawer }) {
  const {deviceCache, setdeviceCache, characteristicCache, setcharacteristicCache} = useContext(BluetoothContext)
  const navigate = useNavigate();


  // React.useEffect(()=>{
  //   const localDeviceCache = JSON.stringify(localStorage.getItem("devicecache"))
  //   const localCharacteristicsCache = JSON.stringify(localStorage.getItem("characteristics"))
  //   if (localDeviceCache && localCharacteristicsCache) {
  //     setdeviceCache(localDeviceCache)
  //     setcharacteristicCache(localCharacteristicsCache)
  //   }else{
  //     setdeviceCache(null)
  //     setcharacteristicCache(null)
  //   }

  // },[])
  //Disconnect Event handler
  const connectClick = () => {
    console.log(deviceCache, "hiiiii")
    connect();
  };
  //Disconnect Event handler
  const disconnectClick = () => {
    disconnect();
  };
  //Receive response Event handler
  const handleClick = (command) => {
    

    // send(e.target.value);
  };

  // Launch Bluetooth device chooser and connect to the selected
  function connect() {
    return (
      (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
        .then((device) => connectDeviceAndCacheCharacteristic(device))
        // .then((characteristic) => startNotifications(characteristic))
        .catch((error) => console.log(error))
    );
  }
  //Function that scans available devices
  function requestBluetoothDevice() {
    console.log("Requesting bluetooth device...");
    return navigator.bluetooth
      .requestDevice({
        filters: [{ services: [0xffe0] }],
      })
      .then((device) => {
        console.log('"' + device.name + '" bluetooth device selected');
        setdeviceCache(device);
        // localStorage.setItem("devicecache",JSON.stringify(device))
        return deviceCache;
      });
  }

  // Connect to the device specified, get service and characteristic
  function connectDeviceAndCacheCharacteristic(device) {
    if (device.gatt.connected && characteristicCache) {
      return Promise.resolve(characteristicCache);
    }

    console.log("Connecting to GATT server...");

    return device.gatt
      .connect()
      .then((server) => {
        console.log("GATT server connected, getting service...");

        return server.getPrimaryService(0xffe0);
      })
      .then((service) => {
        console.log("Service found, getting characteristic...");

        return service.getCharacteristic(0xffe1);
      })
      .then((characteristic) => {
        console.log("Characteristic found");
        setcharacteristicCache(characteristic);
        // localStorage.setItem("characteristics",JSON.stringify(characteristic))
        return characteristicCache;
      });
  }
  //Disconnect Device
  function disconnect() {
    if (deviceCache) {
      console.log(
        'Disconnecting from "' + deviceCache.name + '" bluetooth device...'
      );

      if (deviceCache.gatt.connected) {
        deviceCache.gatt.disconnect();
        console.log('"' + deviceCache.name + '" bluetooth device disconnected');
      } else {
        console.log(
          '"' + deviceCache.name + '" bluetooth device is already disconnected'
        );
      }
    }
    // localStorage.clear()
    setcharacteristicCache(null);
    setdeviceCache(null);
  }
  //Send data to controller
  function send(data) {
    data = String(data);

    if (!data || !characteristicCache) {
      return;
    }

    writeToCharacteristic(characteristicCache, data);
  }
  function writeToCharacteristic(characteristic, data) {
    characteristic.writeValue(new TextEncoder().encode(data));
  }

  return (
    <div className="home_container">
      <div className="home_header">
        <PersonIcon style={{ width: "40px", height: "40px", color: "white", marginLeft: "0.5em" }} />
        <p className="header_title">Home</p>
      </div>

      <div className="home_buttons">
        {/* connection button */}
        <button className="connect_btn" onClick={connectClick}>
          <div style={{ width: "50px" }}><BluetoothConnectedIcon /></div>
          Connect
        </button>
        <br />
        {deviceCache && (
          <button className="disconnect_btn" onClick={disconnectClick}>
            <div style={{ width: "50px" }}><BluetoothDisabledIcon /></div>
            Disconnect
          </button>
        )}

        {/* control button */}
        <div className="control_btn_holder">
          {deviceCache && (
            <button className="ctrl_btn" value={"F"} onClick={() => send("F")}>
              <KeyboardArrowUpIcon style={{ width: "50px", height: "50px", color: "black" }} />
            </button>
          )}
          <div className="control_btn_holder_middle">
            {deviceCache && (
              <button className="ctrl_btn" value={"L"} onClick={() => send("L")}>
                <KeyboardArrowLeftIcon style={{ width: "50px", height: "50px", color: "black" }} />
              </button>
            )}
            {deviceCache && (
              <button className="ctrl_btn" value={"S"} onClick={() => send("S")}>
                <CancelIcon style={{ width: "50px", height: "50px", color: "black" }} />
              </button>
            )}
            {deviceCache && (
              <button className="ctrl_btn" value={"R"} onClick={() => send("R")}>
                <KeyboardArrowRightIcon style={{ width: "50px", height: "50px", color: "black" }} />
              </button>
            )}

          </div>
          {deviceCache && (
            <button className="ctrl_btn" value={"B"} onClick={() => send("B")}>
              <KeyboardArrowDownIcon style={{ width: "50px", height: "50px", color: "black" }} />
            </button>
          )}

        </div>
        <div className="drawer_holder">
          <Drawer activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer} />
        </div>

      </div>
    </div>
  );
}

export default Home;