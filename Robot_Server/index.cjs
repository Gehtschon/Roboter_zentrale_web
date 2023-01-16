const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pigpio = require('pigpio');
const child_process = require('child_process');
const fs = require("fs");


const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + '/index.html');
});


const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const videostop = child_process.execSync('sudo service motion stop');
const video = child_process.execSync('sudo service motion start');

// Initialize the PWM pins for the left and right motors
const leftPwmPin = 18;
const directionLeftPin = 2;
const rightPwmPin = 26;
const directionRightPin = 3;
const pwmFrequency = 100;

const { Pwm } = pigpio;
const Gpio = require('pigpio').Gpio;

const leftPwm = new Gpio(leftPwmPin,{mode: Gpio.OUTPUT});
//leftPwm.setPeriod(1 / pwmFrequency);
//leftPwm.enable(true);
leftPwm.pwmWrite(0);

const rightPwm = new Gpio(rightPwmPin,{mode: Gpio.OUTPUT});
//rightPwm.setPeriod(1 / pwmFrequency);
//rightPwm.enable(true);
rightPwm.pwmWrite(0);

const directionLeft = new Gpio(directionLeftPin,{mode: Gpio.OUTPUT});
const directionRight = new Gpio(directionRightPin,{mode: Gpio.OUTPUT});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
   // console.log(`Received message: ${message}`);
    // Parse the data string into a JSON object
    var data = JSON.parse(message);
    // Check the direction of the motor
    if (data.direction === "left") {
      // set direcition
      const dirleft = parseInt(data.directionleftmotor,10);
      directionLeft.digitalWrite(dirleft);
      // Set the duty cycle of the left motor based on the percentage value
      const intspeedleft = parseInt(data.percentageleft, 10);
      const intValue255left = intspeedleft * 255 / 100;
      const intspeedoutleft = parseInt(intValue255left, 10);
      if(intspeedoutleft > 255){
        intspeedoutleft = 255;
      }
      if(intspeedoutleft<0){
        intspeedoutleft = 0;
      }
      leftPwm.pwmWrite(intspeedoutleft);
    } else if (data.direction === "right") {
      // set direcition
      const dirright = parseInt(data.directionrightmotor,10);
      directionRight.digitalWrite(dirright);
      // Set the duty cycle
      const intspeedright = parseInt(data.percentageright, 10);
      const intValue255right = intspeedright * 255 / 100;
      const intspeedoutright = parseInt(intValue255right, 10);
      if(intspeedoutright > 255){
        intspeedoutright = 255;
      }
      if(intspeedoutright<0){
        intspeedoutright = 0;
      }
      rightPwm.pwmWrite(intspeedoutright);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});