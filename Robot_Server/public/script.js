      const socket = new WebSocket("ws://192.168.43.111:3000");

      // Get a reference to the up, down, left, and right buttons
      const upRightButton = document.getElementById("UpRight");
      const upLeftButton = document.getElementById("UpLeft");

      const leftButton = document.getElementById("Left");
      const rightButton = document.getElementById("Right");

      const downRightButton = document.getElementById("DownRight");
      const downLeftButton = document.getElementById("DownLeft");

      // Global directions
      var directionleft = 1;
      var directionright = 1;

      // Check if the browser supports the Gamepad API
      if (navigator.getGamepads) {
        // Create an array to store the gamepad objects
        var gamepads = [];

        // Create an interval to check for gamepad input
        var interval = setInterval(function () {
          // Get the gamepad objects
          gamepads = navigator.getGamepads();

          // Loop through the gamepad objects
          for (var i = 0; i < gamepads.length; i++) {
            var gamepad = gamepads[i];

            // Check if the gamepad is connected
            if (gamepad) {
              // Get the button and axis values from the gamepad
              var buttons = gamepad.buttons;
              var axes = gamepad.axes;

              if (buttons[4].value) {
                console.log("left pressed");
                if (directionleft == 1) {
                  directionleft = 0;
                } else {
                  directionleft = 1;
                }
              }
              if (buttons[5].value) {
                console.log("right pressed");
                if (directionright == 1) {
                  directionright = 0;
                } else {
                  directionright = 1;
                }
              }

              // light the up and down buttons
              if (directionright == 1) {
                upRightButton.classList.add("light");
                downRightButton.classList.remove("light");
              } else {
                downRightButton.classList.add("light");
                upRightButton.classList.remove("light");
              }

              if (directionleft == 1) {
                upLeftButton.classList.add("light");
                downLeftButton.classList.remove("light");
              } else {
                downLeftButton.classList.add("light");
                upLeftButton.classList.remove("light");
              }

              // Check if the left direction is pressed on the analog stick
              if (axes[2]) {
                // Calculate the percentage value
                var percentage = ((axes[2] + 1) / 2) * 100;
                var intpercentage = parseInt(percentage);
                leftButton.textContent = `${intpercentage}%`;
                var data = {
                  direction: "left",
                  directionleftmotor: directionleft,
                  percentageleft: percentage,
                };
                // Convert the JSON object to a string
                var dataString = JSON.stringify(data);
                // Send the data string to the server
                socket.send(dataString);
                // Highlight the left button
                leftButton.classList.add("active");
                // Remove the highlight from the right button
                //rightButton.classList.remove("active");
              } else {
                // Remove the highlight from the left button
                leftButton.classList.remove("active");
                // Remove the data-percentage attribute from the left button
              }

              // Check if the right direction is pressed on the analog stick
              if (axes[5]) {
                // Calculate the percentage value
                var percentage = ((axes[5] + 1) / 2) * 100;
                // Set the text content of the right button to the percentage value
                var intpercentage = parseInt(percentage);
                rightButton.textContent = `${intpercentage}%`;
                var data = {
                  direction: "right",
                  directionrightmotor: directionright,
                  percentageright: percentage,
                };
                // Convert the JSON object to a string
                var dataString = JSON.stringify(data);
                // Send the data string to the server
                socket.send(dataString);
                // Highlight the left button
                rightButton.classList.add("active");
                // Remove the highlight from the right button
                //leftButton.classList.remove("active");
              } else {
                // Remove the highlight from the left button
                rightButton.classList.remove("active");
              }
            }
          }
        }, 100); // Check for gamepad input every 100 milliseconds
      }