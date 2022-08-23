import './style.css';
import io from 'socket.io-client';
import { url } from '../server/config';

(function() {

    const switchElement = document.getElementById('switch');

    let state = false; // Switch state (true [on]/false [off])

    const setLight = (mode) => {
      state = mode === 'toggle' ? !state : mode === 'on';
      if(state) {
        // Turn light on
        switchElement.classList.add('on');
      } else {
        // Turn light off
        switchElement.classList.remove('on');
      }
    };

    const toggle = () => {
      // Toggle light/switch
      setLight('toggle');

      // Emit the event led:on/off when the switch is clicked
      socket.emit(`led:${ state ? 'on' : 'off'}`);
      console.log(`Sent: ${state ? 'on' : 'off'}`);
    };

    // Connect to the socket server
    const socket = io('https://vast-spire-72900.herokuapp.com/');
    
    // Turn off the LED when the page loads
    socket.emit('led:off');

    // event listener (click) to the switch to turn the LED on/off
    switchElement.addEventListener('click', toggle); // When the light is on


    // When the event led:on is received toggle the switch to on
    socket.on('led:on', () => {
      console.log('Received: on');
      setLight('on');
    });

    // When the event led:off is received toggle the switch to off
    socket.on('led:off', () => {
      console.log('Received: off');
      setLight('off');
    });
  }

)();
