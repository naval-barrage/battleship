import React, {Component} from 'react'
import './howTo.scss'
import Nav from '../Nav/Nav'

export default class HoWTo extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
            <div className='HowTo'>
                <Nav/>
        </div>
        )
    }
}