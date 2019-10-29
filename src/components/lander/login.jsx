import React, {Component} from 'react'
import './login.scss'
import {Link} from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            email: '',
            password: '',
            password2: '',
            user: {}
        }
    }
    // async componentDidMount() {
    //     this.setState({
    //         user: {}
    //     })
    // }
    // updateUser = (user) => {
    //     this.setState({
    //         user,
    //     });
    //     console.log(user)
    // }
    toggleChange = () => {
        this.setState({
            register: !this.state.register
        })
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    // register = async () => {
    //     const {email, password, password2} = this.state
    //     if (password !== password2) {
    //         swal.fire({type: 'error', text: 'Passwords dont match' , showConfirmButton: false, timer: 1500})
    //     } else {
    //         try {
    //             const res = await axios.post('/auth/register', {email, password})
    //             if (res.data.user) {
    //                 swal.fire({type: 'success', text: res.data.message, showConfirmButton: false, timer: 1500})
    //                 this.updateUser(res.data.user)
    //                 this.props.history.push('/list')
    //                 store.dispatch({
    //                     type: LOGIN_USER,
    //                     payload: true
    //                 })
    //             } 
    //         } catch (error) {
    //             swal.fire({type: 'error', text: 'Email is already in use', showConfirmButton: false, timer: 1500})
    //         }
    //     } 
    // }
    // login = async () => {
    //     const {email, password} = this.state
    //     try {
    //         const res = await axios.post('/auth/login', {email, password})
    //         swal.fire({type: 'error', text: 'Wrong password or wrong email' , showConfirmButton: false, timer: 1500})
    //         if (res.data.user) {
    //             this.updateUser(res.data.user)
    //             this.props.history.push('/list')
    //             swal.fire({type: 'success', text: res.data.message , showConfirmButton: false, timer: 800})
    //             store.dispatch({
    //                 type: LOGIN_USER,
    //                 payload: true
    //             })
    //         }
    //     } catch (error) {  
    //         swal.fire({type: 'error', text: 'Wrong password or wrong email' , showConfirmButton: false, timer: 1500})
    //     }
    // }
    render() {
        return(
        <div className='landing-box'>
            {!this.state.register
            ? (
                <div>
                    <div className='login'>
                <div className='input-titles'>Username</div>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='Username'/>
                <div className='input-titles'>Your Password</div>
                <input onChange={(e) => this.handleChange(e, 'password')} type="password" placeholder='Password'/>
                <div>
                    <div className="log">
                        <button className='regbutton'  onClick={() => this.toggleChange()}>Register</button>
                        <Link to='home'><button className='enter'>Login</button></Link>
                        {/* <button className='enter' onClick={() => this.login()}>Login</button> */}
                    </div>
                    </div>
                    </div>
            </div>
            ) : (
                <div className='register-box'>
                    <div className='input-titles'>Create a Username</div>
                    <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='Username'/>
                    <div className='input-titles'>Set a password</div>
                    <div>
                        <input onChange={(e) => this.handleChange(e, 'password')} type="password" placeholder='Password'/>
                    </div>
                        <input onChange={(e) => this.handleChange(e, 'password2')} type="password" placeholder='Repeat Password'/>
                <div>
                    <div className="log">
                        <button className='regbutton' onClick={() => this.toggleChange()}>Back to Login</button>
                        <Link to='home'><button className='enter'>Register</button></Link>
                        {/* <button className='enter' onClick={() => this.register()}>Register</button> */}
                    </div>
                </div>
            </div>
            )}
            <Link to='/howto'><button className='aboutbutton'>About</button></Link>
        </div>
        )
    }
}
