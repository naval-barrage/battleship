import React from 'react';
import './alert.scss'


function Alert() {
  return (
    <div id='alert'>
        <div>
            <div className='not-u-turn'>
            <p>Its Not your turn anymore, please wait for your opponent to make their move.</p>
            <div class="radar">
            <div class="pointer"></div>
            <div class="shadow"></div>
            </div></div></div>
    </div>
  );
}

export default Alert;