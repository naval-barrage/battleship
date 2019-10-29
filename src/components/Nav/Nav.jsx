import React, {Component} from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";
import axios from 'axios'
import swal from 'sweetalert2'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    logout = async () => {
        const res = await axios.delete('/auth/logout')
        this.props.history.push('/')
        swal.fire({type: 'success', text: res.data.message, showConfirmButton: false, timer: 800})
    }

    render() {
        return(
        <div className='Nav'>
            <Link to='/home'><button className='enter'>Home</button></Link>
            <Link to='/gameroom'><button className='enter'>Gameroom</button></Link>
            <Link to='/howto'><button className='enter'>How to play</button></Link>
            <button onClick={() => this.logout()} className='logout-button'>Logout</button>
        </div>
        )
    }
}

function mapStateToProps(state){
    const {user} = state;
    return {user}
}

export default connect(
  mapStateToProps,
  { updateUser }
)(Nav);
