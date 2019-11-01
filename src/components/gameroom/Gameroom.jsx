import React, {Component} from 'react'
import './gameroom.scss'
import Nav from '../Nav/Nav'
import EnemyGrid from './EnemyGrid/enemyGrid'
import LeaderBoard from './LeaderBoard/LeaderBoard'
import Ships from './Ships/Ships'
import YourGrid from './YourGrid/YourGrid'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class Gameroom extends Component {
    constructor() {
        super()
        this.state = {
            yourGrid: [],
            enemyGrid: [],
            friendStats: {},
            gameStats: {}
        }
    }

    componentDidMount() {
        this.getGameInfo()
    }

    getGameInfo() {
        axios.get(`/api/game/${+this.props.match.params.gameroom_id}`).then(res => {
            console.log(res.data)
            console.log(this.props.user.user.user_id)
            if (res.data.gameroom.host_id === this.props.user.user.user_id) {
                console.log('you are the host')
                this.setState({
                    yourGrid: res.data.game.host,
                    enemyGrid: res.data.game.guest,
                    friendStats: res.data.friendship,
                    gameStats: res.data.gameroom
                })
            } else {
                console.log('you are the guest')
                this.setState({
                    yourGrid: res.data.game.guest,
                    enemyGrid: res.data.game.host,
                    friendStats: res.data.friendship,
                    gameStats: res.data.gameroom
                })
            }
        })
    }
    render() {
        return(
        <div>
                <Nav/>
            <div className='Gameroom'>
                <Ships/>
                <YourGrid grid={this.state.yourGrid}/>
                <LeaderBoard friendStats={this.state.friendStats} gameStats={this.state.gameStats}/>
                <EnemyGrid grid={this.state.enemyGrid}/>
        </div>
    </div>
        )
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(Gameroom));
