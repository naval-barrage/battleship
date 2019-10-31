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
        console.log(this.state.activeGames)
        return(
            <div className='ActiveGames'>
                    {
                    this.state.activeGames.length ? 0 (
                        this.state.activeGames.map(activeGames => {
                            return (
                                <div className='List-of-friends'>
                        <div className="FriendOnline">
                            {`${this.state.activeGames}`}
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