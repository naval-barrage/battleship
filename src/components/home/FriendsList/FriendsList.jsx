import React, {Component} from 'react'
import './friendsList.scss'
import axios from 'axios'
// import swal from 'sweetalert2'

export default class FriendsList extends Component {
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
    handleStartGame() {
        
    }
    
    render() {
        return(
            <div className='FriendsList'>
                {
                    this.state.friendsList.length ? (
                        this.state.friendsList.map((friendsList, i) => {
                            return (
                                <div className='List-of-friends'>
                        <div className="FriendOnline">
                            {`${this.state.friendsList[i].friend_info[0].username}`}
                            {!this.state.friendsList[i].friendship_info.game_active ? (
                                <button onClick={() => this.handleStartGame(friendsList.user_id)}>Start Game</button>
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