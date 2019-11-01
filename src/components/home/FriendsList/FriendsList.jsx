import React, {Component} from 'react'
import './friendsList.scss'
import axios from 'axios'
import { connect } from "react-redux";
// import swal from 'sweetalert2'

class FriendsList extends Component {
    constructor() {
        super()
        this.state = {
            friendsList: []
        }
    }
    componentDidMount() {
        axios.get(`/api/friends`).then(res => {
            this.setState({
                friendsList: res.data
            })
        })
    }
    handleStartGame(user_id) {
        axios.post(`/api/games/new/${+user_id}`).then(res => {

        })
    }
    render() {
        return(
            <div className='FriendsList'>
                Your Friends:
                {
                    this.state.friendsList.length ? (
                        this.state.friendsList.map((friendsList, i) => {
                            return (
                                <div className='List-of-friends'>
                        <div className="FriendOnline">
                            {console.log(this.state.friendsList[i])}
                            {`${this.state.friendsList[i].friend_info[0].img}  `}
                            {`${this.state.friendsList[i].friend_info[0].username}`}
                            {` Wins: ${this.state.friendsList[i].friendship_info.friend1_wins} loses: ${this.state.friendsList[i].friendship_info.friend2_wins}`}
                            {!this.state.friendsList[i].friendship_info.game_active ? (
                                <button onClick={() => this.handleStartGame(friendsList.user_id)}>
                                Start Game</button>
                            ) : ( 
                                <button>Game Active</button>
                            )}
                        </div>
                    </div>
                    )
                })
                ) : null
            }
        </div>
        )
    }
}
function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(FriendsList);