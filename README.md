# Luftspaltroboter_Zentrale_Web

Zentralen Simulation

In the Linux and Web Technologies workshop (WLW), a web application had to be developed. This was used as an opportunity to develop a central simulation for the air gap robot. This application can be used for testing in Project 6.

##Block Diagram

A web application was developed that reads Gamecontroller inputs and sends them to a server via Websockets.
The server side is a Raspberry Pi. Based on the controller inputs, it generates the required signals for motor control on the robot.
The front camera of the robot can be connected to the Raspberry Pi, which sends the video to the website.
![ALT](/Block.jpg)

##Use

To use the application, the following packages must be installed on the Raspberry Pi:

NodeJS: Webserver
Pigpio: Use of I/O
Motion: Camera image webserver
The Motion configuration file is stored in the appendix. In this, the ports and frame rates are set.

The application can then be started with [START COMMAND HERE]. The Motion server is started in the NodeJs application, so there is no need to start it separately. Then a web browser can connect to the IP address of the server (port: 3000). If a gamepad is now connected to the end user device, the robot can be controlled via this.

##Connections

The robot must be connected to the Raspberry Pi as follows.

Raspberry Pi	Roboter
Pin 2	Direction-Left
Pin 3	Direction-Right
Pin 18	PWM Left
Pin 26	PWM Right
USB	Camera