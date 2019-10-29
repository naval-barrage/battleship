import React, {Component} from 'react'
import './gameroom.scss'
import Nav from '../Nav/Nav'
import EmyGrid from './EmyGrid/EmyGrid'
import LeaderBoard from './LeaderBoard/LeaderBoard'
import Ships from './Ships/Ships'
import YourGrid from './YourGrid/YourGrid'

export default class Gameroom extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
        <div>
                <Nav/>
            <div className='Gameroom'>
                <Ships/>
                <YourGrid/>
                <LeaderBoard/>
                <EmyGrid/>
        </div>
    </div>
        )
    }
}
