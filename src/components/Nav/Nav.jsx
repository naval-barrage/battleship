import React, {Component} from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
        <div className='Nav'>
            <Link to='/'><button className='enter'>Logout</button></Link>
            <Link to='/home'><button className='enter'>Home</button></Link>
            <Link to='/gameroom'><button className='enter'>Gameroom</button></Link>
            <Link to='/howto'><button className='enter'>How to play</button></Link>
        </div>
        )
    }
}
