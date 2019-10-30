import React, {Component} from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";
import axios from 'axios'
import swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        this.props.updateUser(user)
        // alert(res.data.message)
        swal.fire({
            text: res.data.message.text,
            type: 'success',
            timer: 1500,
            showConfirmButton: false
        })
        this.props.history.push('/')
        // console.log(this.props.history);
        
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
    const {user, loggedIn} = state;
    return {user, loggedIn}
}

export default connect(
  mapStateToProps,
  { updateUser },
)(withRouter(Nav));
