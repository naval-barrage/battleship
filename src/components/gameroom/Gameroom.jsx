import React, {Component} from 'react'
import './gameroom.scss'
import Nav from '../Nav/Nav'

export default class Gameroom extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
            <div className='Gameroom'>
                <Nav/>

        </div>
        )
    }
}
