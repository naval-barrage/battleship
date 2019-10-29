import React, {Component} from 'react'
import './home.scss'
import Nav from '../Nav/Nav'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
            <div className='Home'>
                <Nav/>
        </div>
        )
    }
}
