hardware.pin2.configure(ANALOG_IN);
hardware.pin5.configure(DIGITAL_OUT);
 //избираме пинове 8 и 9 за i2c комуникацията  
 hardware.configure(I2C_89);  
 //Избираме честота на работа  
 hardware.i2c89.configure(CLOCK_SPEED_400_KHZ);  
 //Запазваме адреса на сензора  
 local tempSensorSlaveadd0 = 0x48;  
 const DEG_PER_COUNT = 0.0625;  
 function readTemp() {  
 //взимаме адреса  
   local i2ctempAddress = tempSensorSlaveadd0 << 1;  
   //прочитаме 2 байта  
    local bytes = hardware.i2c89.read(i2ctempAddress, format("%c", 0x0), 2);  

 local temp = ((bytes[0] << 8) | bytes[1]) >> 4;  
 //връщаме температурата  
    return temp*DEG_PER_COUNT;  
 };  
 
 
 function getPin2Voltage() 
{
    // Returns value in volts, between 0.0 and 3.3
 
    local voltage = hardware.voltage();
    local reading = hardware.pin2.read();
    return (reading / 65535.0) * voltage;
}
  
  local send = {
        "temp": "22",
        "humidity": "11%"
    };
 
 
 agent.on("order", function (value) {
 hardware.pin5.write(1);
  imp.sleep(0.10);
   hardware.pin5.write(0);
});

agent.on("location", function (value) {
    agent.send("location", imp.scanwifinetworks());
});
 
 function loop()  
 {  
 //принтираме температурата  
  local sensorRH = 161.0 * getPin2Voltage() / 3.3 - 25.8;
  local trueRH = sensorRH / (1.0546 - 0.0026 * readTemp());
  send.temp = readTemp();
  send.humidity = trueRH;
 
  agent.send("temp", send);
 server.log("Teprature: " + readTemp());  
 server.log("Humidity : " + trueRH);

 //тази функция ще се изпълнява всеки 1 секунди  
 imp.wakeup(30,loop);  
 }  
 loop();  