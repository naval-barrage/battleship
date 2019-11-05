import React from 'react';
import './alert.scss'


function Alert() {
  return (
    <div id='alert'>
        <div>
            <div className='not-u-turn'>
            <p>Its Not your turn anymore, please wait for your opponent to make their move.</p>
            <div className="radar">
            <div className="pointer"></div>
            <div className="shadow"></div>
            </div></div>
            <div className="dot1 pos11"></div>
            <div className="dot1 pos21"></div>
            <div className="dot1 pos31"></div>
            <div className="dot1 pos41"></div>
            <div className="dot1 pos51"></div>
            </div>
    </div>
  );
}

export default Alert;