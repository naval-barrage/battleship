import React, {Component} from 'react'
import './activeGames.scss'
import axios from 'axios'

export default class ActiveGames extends Component {
    constructor() {
        super()
        this.state = {
            activeGames: []
        }
    }
    componentDidMount() {
        axios.get(`/api/games`).then(res => {
            this.setState({
                activeGames: res.data
            })
        })
    }
    render() {
        // console.log(this.state.activeGames.length)
        return(
            <div className='ActiveGames'>
                <div>Active Games list:</div>
                    {
                    this.state.activeGames.length ? (
                        this.state.activeGames.map(activeGames => {
                            return (
                                <div className='List-of-friends'>
                        <div className="FriendOnline">
                            <div>dsjflkdsj</div>
                            {activeGames.length === 0 ? (
                                <div>No games active</div>
                                ) : (
                                // <div>{`${activeGames}`}</div>
                                <div>games</div>
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
