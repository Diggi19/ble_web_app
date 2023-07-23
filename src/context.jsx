import React, { createContext, useState } from 'react';

const BluetoothContext = createContext();

const BluetoothContextProvider = ({ children }) => {
    const [deviceCache, setdeviceCache] = useState('');
    const [characteristicCache, setcharacteristicCache] = useState(null);

  return (
    <BluetoothContext.Provider value={{deviceCache,characteristicCache,setdeviceCache,setcharacteristicCache}}>
      {children}
    </BluetoothContext.Provider>
  );
};

export { BluetoothContext, BluetoothContextProvider };