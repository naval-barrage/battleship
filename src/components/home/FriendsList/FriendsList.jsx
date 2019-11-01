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
    findRatio(user_id) {

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
                            <button onClick={() => this.findRatio(this.props.user)}>get win lose</button>
                            {console.log(this.props.user)}
                            {`${this.state.friendsList[i].friend_info[0].img}  `}
                            {`${this.state.friendsList[i].friend_info[0].username}`}
                            {!this.state.friendsList[i].friendship_info.game_active ? (
                                <button onClick={() => this.handleStartGame(friendsList.user_id)}>
                                {/* {console.log(this.state.friendsList)} */}
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