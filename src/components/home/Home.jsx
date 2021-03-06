import React, {Component} from 'react'
import './home.scss'
import Active from './ActiveGames/ActiveGames'
import Friends from './FriendsList/FriendsList'
import Search from './Search/Search'
import Nav from '../Nav/Nav'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return(
        <div>
            <Nav/>
            <div className='Home'>
                <Friends/>
                <Search/>
                <Active/>
                <div className='howto'><Link to='/howto'><button className='yankee'>How To Play<i class="fas fa-question"></i></button></Link></div>
        </div>
    </div>
        )
    }
}
