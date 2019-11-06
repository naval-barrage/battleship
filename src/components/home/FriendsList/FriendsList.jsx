import React, {Component} from 'react'
import './friendsList.scss'
import axios from 'axios'
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

class FriendsList extends Component {
    constructor() {
        super()
        this.state = {
            friendsList: []
        }
    }
    componentDidMount() {
        axios.get(`/api/friends`).then(res => {
            // console.log(res.data)
            this.setState({
                friendsList: res.data
            })
        })
    }
    componentDidUpdate(prevState) {
        if (this.state.friendsList !== prevState.friendsList) {
            axios.get(`/api/friends`).then(res => {
                // console.log(res.data)
                this.setState({
                    friendsList: res.data
                })
            })
        }
    }
    handleStartGame(guest_id) {
        axios.post(`/api/games/new/${+guest_id}`).then(res => {
            // swal.fire({type: 'success' , text: 'Game Started' , showConfirmButton: false, timer: 1000})
            this.props.history.push(`/gameroom/${res.data.gameroom_id}`)
        })
    }
    render() {
        // console.log(this.props.user.user.user_id)
        return(
            <div className='FriendsList'>
                <div className="FriendsBox">
                <p>Your Friends:</p>
                <div className="listFriends">
                {
                    this.state.friendsList.length ? (
                        this.state.friendsList.map((friendsList, i) => {
                            return (
                                <div className='List-of-friends'>
                        <div className="FriendOnline">
                            {/* {console.log(this.state.friendsList[i].friendship_info.friend1_wins)} */}
                            <img src={this.state.friendsList[i].friend_info[0].img} alt="A boat to show ranking"/>
                            {this.state.friendsList[i].friend_info.friend1 !== this.state.friendsList[0].user_id ? (
                                <div>{`Wins: ${this.state.friendsList[i].friendship_info.friend1_wins} Loses: ${this.state.friendsList[i].friendship_info.friend2_wins}`}</div>
                                ): (
                                <div>{`Wins: ${this.state.friendsList[i].friendship_info.friend2_wins} Loses: ${this.state.friendsList[i].friendship_info.friend1_wins}`}</div>
                            )}
                            {`${this.state.friendsList[i].friend_info[0].username}`} 
                            {!this.state.friendsList[i].friendship_info.game_active ? (
                                <button className='papa' onClick={() => this.handleStartGame(friendsList.friend_info[0].user_id)}>
                                Start Game</button>
                            ) : ( 
                                <button className='uniform'>Game Active</button>
                                )}
                        </div>
                    </div>
                    )
                })
                ) : null
            }
            </div>
            </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(FriendsList));
