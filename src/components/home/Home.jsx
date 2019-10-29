import React, {Component} from 'react'
import './home.scss'
import Active from './ActiveGames/ActiveGames'
import Friends from './FriendsList/FriendsList'
import Search from './Search/Search'
import HowTo from '../HowTo/HowTo'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
            <div className='Home'>
                <Friends/>
                <Search/>
                <Active/>
                <HowTo/>
        </div>
        )
    }
}
