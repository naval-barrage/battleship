import React, { Component } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";
import axios from "axios";
import swal from "sweetalert2";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      register: false,
      username: "",
      email: "",
      password: "",
      password2: "",
      user: {}
    };
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
    });
  };
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  // register = async () => {
  //     const {username, email, password, password2} = this.state
  //     if (password !== password2) {
  //         swal.fire({type: 'error', text: 'Passwords dont match' , showConfirmButton: false, timer: 1500})
  //     } else {
  //         try {
  //             const res = await axios.post('/auth/register', {email, password, username})
  //             if (res.data.user) {
  //                 swal.fire({type: 'success', text: res.data.message, showConfirmButton: false, timer: 1500})
  //                 this.updateUser(res.data.user)
  //                 this.props.history.push('/gameroom')
  //             }
  //         } catch (error) {
  //             swal.fire({type: 'error', text: 'Email is already in use', showConfirmButton: false, timer: 1500})
  //         }
  //     }
  // }

  register() {
    const { username, email, password, password2 } = this.state;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      return swal.fire({ type: "error", text: "please fill all input boxes" });
    }
    if (password !== password2) {
      swal.fire({
        type: "error",
        text: "Passwords dont match",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      axios
        .post("/auth/register", { username, email, password: password2 })
        .then(res => {
          this.props.updateUser(res.data.user);
          this.props.history.push("/home");
        });
    }
  }
  // LOGIN
  login = async ()=>{
    const {username, password} = this.state
    if(username === '' || password === ''){
      return swal.fire({type:'error', text: 'please fill all input boxes'})
    }
    const res = await axios.post('/auth/login', {username, password})
    if(res.data.user){
      let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username}, loggedIn: res.data.loggedIn}
      this.props.updateUser(user)
      
      this.props.history.push('/home')
      
    }
    // swal.fire(res.data.message)
  }

  // login = async () => {
  //   const { username, password } = this.state;
  //   try {
  //     const res = await axios.post("/auth/login", { username, password });
  //     swal.fire({
  //       type: "error",
  //       text: "Wrong password or wrong Username",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //     if (res.data.user) {
  //       this.updateUser(res.data.user);
  //       this.props.history.push("/home");
  //       swal.fire({
  //         type: "success",
  //         text: res.data.message,
  //         showConfirmButton: false,
  //         timer: 800
  //       });
  //     }
  //   } catch (error) {
  //     swal.fire({
  //       type: "error",
  //       text: "Wrong password or wrong email",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  // };
  render() {
    return (
      <div className='lander-container'>
        <h1 className="title">NAVAL BARRAGE</h1>
        <div className="banner">
        <h5>THE CLASSIC NAVAL WARFARE GAME</h5>
        </div>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      <div className="landing-box">
        {!this.state.register ? (
          <div className="login-box">
            <div className="login">
              <div className="input-titles">Username</div>
              <input
                onChange={e => this.handleChange(e, "username")}
                type="text"
                placeholder="Username"
                />
              <div className="input-titles">Your Password</div>
              <input
                onChange={e => this.handleChange(e, "password")}
                type="password"
                placeholder="Password"
                />
              <div>
                <div className="log">
                  <button
                    className="regbutton"
                    onClick={() => this.toggleChange()}
                    >
                    Register
                  </button>
                  <button className="enter" onClick={() => this.login()}>
                    Login
                  </button>
                  <Link to="/howto">
                    <button className="aboutbutton">How to play</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-box">
            <div className="input-titles">Create a Username</div>
            <input
              onChange={e => this.handleChange(e, "email")}
              type="text"
              placeholder="Email"
            />
            <div>
              <input
                onChange={e => this.handleChange(e, "username")}
                type="text"
                placeholder="Username"
                />
            </div>
            <div className="input-titles">Set a password</div>
            <div>
              <input
                onChange={e => this.handleChange(e, "password")}
                type="password"
                placeholder="Password"
                />
            </div>
            <input
              onChange={e => this.handleChange(e, "password2")}
              type="password"
              placeholder="Repeat Password"
              />
            <div>
              <div className="log">
                <button
                  className="regbutton"
                  onClick={() => this.toggleChange()}
                  >
                  Back to Login
                </button>
                <button className="enter" onClick={() => this.register()}>
                  Register
                </button>
                <Link to="/howto">
                  <button className="aboutbutton">How to play</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
</div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(Login);
