import React from 'react';
import './alert.scss'
import {Link} from 'react-router-dom'

function Alert() {
  return (
    <div id='alert'>
        <div>
            <Link to='/home'><div className='not-u-turn'>
            <p>Its Not your turn anymore, please wait for your opponent to make their move.</p>
            <div className="radar">
            <div className="pointer"></div>
            <div className="shadow"></div>
            {/* <div className="dot pos1"></div>
            <div className="dot pos2"></div>
            <div className="dot pos3"></div>
            <div className="dot pos4"></div>
            <div className="dot pos5"></div> */}
            </div></div></Link>
            </div>
    </div>
  );
}

export default Alert;