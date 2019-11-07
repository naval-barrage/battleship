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
      axios.get(`/api/users?username=${username}`).then(res => {
        // console.log(res.data[0].username)
          if (res.data[0].username === this.state.username) {
            return swal.fire({ type: "error", text: "Username has been taken" });
          } else {
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
          if (res.data.user) {
            console.log(res.data)
            let user = {
              user: {
                user_id: res.data.user.user_id,
                username: res.data.user.username
              },
              loggedIn: res.data.loggedIn
            };
          this.props.updateUser(user);
          this.props.history.push("/home");
          }
        });
    }
  }
})
}
  // LOGIN
  login = async () => {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      return swal.fire({ type: "error", text: "please fill all input boxes" });
    }
    const res = await axios.post("/auth/login", { username, password });
    if (res.data.user) {
      let user = {
        user: {
          user_id: res.data.user.user_id,
          username: res.data.user.username
        },
        loggedIn: res.data.loggedIn
      };
      this.props.updateUser(user);

      this.props.history.push("/home");
    } else  {
          swal.fire({
            type: "error",
            text: "Wrong Password or                                                                                           Wrong Username",
            showConfirmButton: false,
            timer: 1500
          });
        }
    // if(password !== password) return swal.fire({ type: "error", text: "incorrect password" });
    // swal.fire(res.data.message)
  };

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
      <div className='backImg'>
      <div  className='lander-container'>
        <h1 className="title">NAVAL BARRAGE</h1>
        <div className="banner">
          <div className="right"></div>
        <h5>THE CLASSIC NAVAL WARFARE GAME</h5>
          <div className="left"></div>
        </div>
        <div className="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        </div>
      </div>
      <div className="landing-box">
      <div className="gameplay">
        <Link to='/howto'><div className='howto-lander'><button className='yankee-lander'>How To Play<i class="fas fa-question"></i></button></div></Link>
      </div>
        {!this.state.register ? (
          <div className="login-box">
            <div className="login">
              <div className="input-titles">Username</div>
              <div>
                <input
                className='login-inputs'
                onChange={e => this.handleChange(e, "username")}
                type="text"
                  placeholder="Username"
                  />
              </div>
              <div className="input-titles">Password</div>
              <div>
                <input
                  className='login-inputs'
                  onChange={e => this.handleChange(e, "password")}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <div className="log">
                  <button
                    className="nov"
                    onClick={() => this.toggleChange()}
                  >
                    Register
                  </button>
                  <button className="charley" onClick={() => this.login()}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-box">
            <div className="input-titles">Create a Username</div>
            <input
              className='login-inputs'
              onChange={e => this.handleChange(e, "email")}
              type="text"
              placeholder="Email"
              />
            <div>
              <input
              className='login-inputs'
              onChange={e => this.handleChange(e, "username")}
              type="text"
              placeholder="Username"
              />
            </div>
            <div className="input-titles">Set a Password</div>
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
                  className="nov"
                  onClick={() => this.toggleChange()}
                  >
                  Back to login
                  </button>
                <button className="charley" onClick={() => this.register()}>
                  Register
                </button>
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
