# Luftspaltroboter_Zentrale_Web

# Central simulation

In the Linux and Web Technologies workshop (WLW), a web application had to be developed.
This was used as an opportunity to develop a central simulation for the air gap robot.
This application can be used for testing in Project 6.

## Block Diagram

A web application was developed that reads Gamecontroller inputs and sends them to a server via Websockets.
The server side is a Raspberry Pi. Based on the controller inputs, it generates the required signals for motor control on the robot.
The front camera of the robot can be connected to the Raspberry Pi, which sends the video to the website.
![ALT](/Block.jpg)

## Use

To use the application, the following packages must be installed on the Raspberry Pi:

NodeJS: Webserver
Pigpio: Use of I/O
Motion: Camera image webserver
The Motion configuration file is stored in the appendix. In this, the ports and frame rates are set.

The application can then be started with sudo node index.cjs.
The Motion server is started in the NodeJs application, so there is no need to start it separately.
Then a web browser can connect to the IP address of the server (port: 3000).
If a gamepad is now connected to the end user device, the robot can be controlled via this.

The Picture is from a Xiaomi Redmi Note 9 Pro
![ALT](/Note_Screen.jpg)


## Connections

The robot has to be connected to the Raspberry Pi as follows:


| Raspbarry PI    | Roboter         |
|-----------------|:----------------|
| Pin 2			  | Direction-Left  |
| Pin 3			  | Direction-Right |
| Pin 18		  | PWM Left        |
| Pin 26		  | PWM Right       |


## Server
The Serverside Node.js script is for controlling the speed of two motors using the Express framework, the WebSocket library, and the pigpio library.
The script starts by importing the necessary modules: express, http, WebSocket, pigpio, child_process, and fs.
Then it creates an Express application and sets up a route for the root URL that serves an HTML file. 
It then starts an HTTP server and a WebSocket server, which listen on port 3000.

The script also starts the motion video service and stops it.

Then, it initializes the PWM pins for the left and right motors and creates Gpio objects for the direction pins.
It also creates two Gpio objects leftPwm and rightPwm for the PWM pins of the left and right motors respectively.

When a WebSocket connection is established, the script sets up an event listener for incoming messages. 
The message is parsed into a JSON object and the direction of the motor is checked. 
If the direction is "left", the script sets the direction of the left motor and the duty cycle of the left motor based on the percentage value received. Similarly, 
if the direction is "right", the script sets the direction of the right motor and the duty cycle of the right motor based on the percentage value received.

Finally, the script starts listening on port 3000, and log the message that the server is listening on that port.

This script can be used to control the speed of two motors by sending WebSocket messages to the server with data in the format:

This HTML file is for an "Inspection Robot" and includes several buttons for controlling the robot's movement, as well as a live video feed from the robot's camera. The file also includes a script that utilizes the WebSocket API to connect to the robot's server at IP address 192.168.1.24 and port 3000. The script also uses the Gamepad API to detect input from a connected gamepad, and maps certain button and axis inputs to control the movement of the robot. Additionally, the script also logs the values of the buttons and axes to the console. The file also links to a CSS file, "style.css," which is used to style the elements on the page.
## Client

The client gets a HTML file this includesseveral buttons for controlling the robot's movement,
as well as a live video feed from the robot's camera. 
The file also includes a script that utilizes the WebSocket API to connect to the robot's server at IP address 192.168.1.24 
and port 3000. The script also uses the Gamepad API to detect input from a connected gamepad, and maps certain button and axis 
inputs to control the movement of the robot. Additionally, the script also logs the values of the buttons and axes to the console. 
The file also links to a CSS file, "style.css," which is used to style the elements on the page.

## Testing

Since the components for the PCB had not yet been delivered, the central simulation could not be tested with the PCB.
This will be done in project 6.
This software will then also be used to test the mechanical design, which should enable
the steering of the robot in the future. The outputs of the server were measured and checked with an oscilloscope.
The data from the oscilloscope was stored as raw data and edited with Matlab.
The Duty cycle from the Raspberry Pi concurred with the displayed values on the Website.

![ALT](/Zentralen_Simulation_1.png)
![ALT](/Zentralen_Simulation_2.png)
![ALT](/Zentralen_Simulation_3.png)
