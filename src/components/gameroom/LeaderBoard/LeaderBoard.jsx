import React, {Component} from 'react'
import './leaderBoard.scss'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class LeaderBoard extends Component {
    constructor() {
        super()
        this.state = {
            wins: 0,
            losses: 0,
            myHits: 0,
            enemyHits: 0,
            myMisses: 0,
            enemyMisses: 0,
            myShipsSunk: 0,
            enemyShipsSunk: 0,
            turn: 0,
            startingTime: 0
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.friendStats !== prevProps.friendStats) {
            if (this.props.friendStats.friend1 === this.props.user.user.user_id) {
                this.setState({
                    wins: this.props.friendStats.friend1_wins,
                    losses: this.props.friendStats.friend2_wins
                })
            } else {
                this.setState({
                    wins: this.props.friendStats.friend2_wins,
                    losses: this.props.friendStats.friend1_wins
                })
            }
        }
        if (this.props.gameStats !== prevProps.gameStats) {
            if (this.props.gameStats.host_id === this.props.user.user.user_id) {
                this.setState({
                    myHits: this.props.gameStats.host_hits,
                    enemyHits: this.props.gameStats.guest_hits,
                    myMisses: this.props.gameStats.host_misses,
                    enemyMisses: this.props.gameStats.guest_misses,
                    myShipsSunk: this.props.gameStats.host_ships_sunk,
                    enemyShipsSunk: this.props.gameStats.guest_ships_sunk,
                    turn: this.props.gameStats.turn,
                    startingTime: this.props.gameStats.starting_time
                })
            } else {
                this.setState({
                    myHits: this.props.gameStats.guest_hits,
                    enemyHits: this.props.gameStats.host_hits,
                    myMisses: this.props.gameStats.guest_hits,
                    enemyMisses: this.props.gameStats.host_misses,
                    myShipsSunk: this.props.gameStats.guest_ships_sunk,
                    enemyShipsSunk: this.props.gameStats.host_ships_sunk,
                    turn: this.props.gameStats.turn,
                    startingTime: this.props.gameStats.starting_time
                })
            }
        }
    }

    componentDidMount() {
        if (this.props.friendStats.friend1 === this.props.user.user.user_id) {
            this.setState({
                wins: this.props.friendStats.friend1_wins,
                losses: this.props.friendStats.friend2_wins
            })
        } else {
            this.setState({
                wins: this.props.friendStats.friend2_wins,
                losses: this.props.friendStats.friend1_wins
            })
        }

        if (this.props.gameStats.host_id === this.props.user.user.user_id) {
            this.setState({
                myHits: this.props.gameStats.host_hits,
                enemyHits: this.props.gameStats.guest_hits,
                myMisses: this.props.gameStats.host_misses,
                enemyMisses: this.props.gameStats.guest_misses,
                myShipsSunk: this.props.gameStats.host_ships_sunk,
                enemyShipsSunk: this.props.gameStats.guest_ships_sunk,
                turn: this.props.gameStats.turn,
                startingTime: this.props.gameStats.starting_time
            })
        } else {
            this.setState({
                myHits: this.props.gameStats.guest_hits,
                enemyHits: this.props.gameStats.host_hits,
                myMisses: this.props.gameStats.guest_hits,
                enemyMisses: this.props.gameStats.host_misses,
                myShipsSunk: this.props.gameStats.guest_ships_sunk,
                enemyShipsSunk: this.props.gameStats.host_ships_sunk,
                turn: this.props.gameStats.turn,
                startingTime: this.props.gameStats.starting_time
            })
        }
    }


    render() {
        return(
            <div className='LeaderBoard'>
                LeaderBoard
                {console.log(this.props)}
                <div className="friendship-stats">
                    <h4>Friendship Stats</h4>
                    <p>Wins: {this.state.wins}</p>
                    <p>Losses: {this.state.losses}</p>
                </div>
                <div className="game-stats">
                    <h4>Game Stats</h4>
                    <h5>Turn: {this.props.gameStats.turn}</h5>
                    <p>My Hits: {this.props.gameStats.host_hits}</p>
                    <p>Enemy Hits: {this.state.enemyHits}</p>
                    <p>My Misses: {this.state.myMisses}</p>
                    <p>Enemy Misses: {this.state.enemyMisses}</p>
                    <p>My Ships Sunk: {this.state.myShipsSunk}</p>
                    <p>Enemy Ships Sunk: {this.state.enemyShipsSunk}</p>

                </div>
        </div>  
        )
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(LeaderBoard));
