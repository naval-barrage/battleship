import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './activeGames.scss'
import axios from 'axios'
import { connect } from "react-redux";

class ActiveGames extends Component {
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
    goToGame(gameroom_id) {
        axios.get(`/api/game/${gameroom_id}`).then(res => {
            // swal.fire({type: 'success' , text: 'Game On!' , showConfirmButton: false, timer: 1000})
            this.props.history.push(`/gameroom/${gameroom_id}`)
        })
    }
    render() {
        return(
            <div className='ActiveGames'>
                <p>Active Games list:</p>
                <div className='active'>
                    {this.state.activeGames.length < 1 ? (
                        <p>no active games</p>
                        ) : (
                <div>
                {
                    this.state.activeGames.length ? (
                    this.state.activeGames.map((activeGames, i) => {
                        return (
                            <div className='results-active'>
                                <div className="ListOfActive">
                                    <img src={activeGames.friend_info[0].img} alt='Boat to show ranking'/>
                                    {`Game with ${activeGames.friend_info[0].username} `}
                                {activeGames.game_info.turn !== activeGames.friend_info[0].user_id ? (
                                    <button className='uturn' onClick={() => this.goToGame(activeGames.game_info.gameroom_id)}>Its your turn!!!!</button>
                                    ) : (
                                        <div class="razar">
                                        <div class="ringbase ring1"></div>
                                        <div class="ringbase ring2"></div>
                                        <div class="pulse"></div>
                                        <div class="pointer">
                                        <div></div>
                                        </div>
                                        <div class="dot pos1"></div>
                                        <div class="dot pos2"></div>
                                    </div>
                                )}
                                </div>
                            </div>
                        )
                    })
                    ) : null
                }
            </div>
            )}
            </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(ActiveGames));
