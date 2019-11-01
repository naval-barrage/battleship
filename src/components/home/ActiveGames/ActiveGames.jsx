import React, {Component} from 'react'
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
    render() {
        return(
            <div className='ActiveGames'>
                <div>Active Games list:</div>
                    {this.state.activeGames.length < 1 ? (
                        <div>no active games</div>
                    ) : (
                <div>
                {
                    this.state.activeGames.length ? (
                    this.state.activeGames.map((activeGames, i) => {
                        return (
                            <div className='results-active'>
                                <div className="ListOfActive">
                                    {/* {console.log(activeGames)} */}
                                    {`${activeGames.friend_info[0].img}  `}
                                    {`Game with ${activeGames.friend_info[0].username} `}
                                {activeGames.game_info.turn !== activeGames.friend_info[0].user_id ? (
                                    <button>its not your turn</button>
                                ) : (
                                    <button>Its your turn!!!!</button>
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
        )
    }
}
function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(ActiveGames);