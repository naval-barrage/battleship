import React, { Component } from "react";
import "./gameroom.scss";
import Nav from "../Nav/Nav";
import EnemyGrid from "./EnemyGrid/enemyGrid";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import Ships from "./Ships/Ships";
import YourGrid from "./YourGrid/YourGrid";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import Swal from 'sweetalert2'
import Alert from "../Alert/Alert";

class Gameroom extends Component {
  constructor() {
    super();
    this.state = {
      // 0 = empty
      // 1 = submarine(3)
      // 2 = destroyer(2)
      // 3 = cruiser(3)
      // 4 = battleship(4)
      // 5 = carrier(5)
      // 6 = miss
      // 7 = hit
      yourGrid: [],
      enemyGrid: [],
      friendStats: {},
      gameStats: {},
      yourTurn: false,
      shipsSet: false
    };
  }

  componentDidMount() {
    this.getGameInfo();
  }

    getGameInfo() {
        axios.get(`/api/game/${+this.props.match.params.gameroom_id}`).then(res => {
            if (res.data.gameroom.host_id === this.props.user.user.user_id) {
                this.setState({
                    yourGrid: res.data.game.host,
                    enemyGrid: res.data.game.guest,
                    friendStats: res.data.friendship,
                    gameStats: res.data.gameroom,
                    shipsSet: res.data.gameroom.ships_placed
                })
                if (res.data.gameroom.turn === this.props.user.user.user_id) {
                    this.setState({yourTurn: true})
                }
            } else {
                this.setState({
                    yourGrid: res.data.game.guest,
                    enemyGrid: res.data.game.host,
                    friendStats: res.data.friendship,
                    gameStats: res.data.gameroom,
                    shipsSet: res.data.gameroom.ships_placed
                })
                if (res.data.gameroom.turn === this.props.user.user.user_id) {
                    this.setState({yourTurn: true})
                }
            }
        })
    }

 

  render() {
    return (
      <div>
        <Nav />
        {!this.state.yourTurn ? <Alert /> : null}
        {this.state.yourTurn ? (
          this.state.shipsSet ? (
            <div className="Gameroom">
              {/* {console.log(this.state.shipsSet)} */}
             
                <EnemyGrid
                  grid={this.state.enemyGrid}
                  updateEnemyGridFn={this.updateEnemyGrid}
                  gameStats={this.state.gameStats}
                  changeTurnFn={this.changeTurn}
                />
                <YourGrid
                  grid={this.state.yourGrid}
                  gameStats={this.state.gameStats}
                  changeTurnFn={this.changeTurn}
                />
              
              <div className='leaderd'>
                <LeaderBoard
                  friendStats={this.state.friendStats}
                  gameStats={this.state.gameStats}
                />
                <Ships />
              </div>
            </div>
          ) : (
            <div className="bigGrid">
                {/* <p>o</p> */}
              <YourGrid
                grid={this.state.yourGrid}
                gameStats={this.state.gameStats}
                changeTurnFn={this.changeTurn}
              />
            </div>
          )
        ) : (
          <div className="Gameroom gameroom-blurred">
            <EnemyGrid
              grid={this.state.enemyGrid}
              updateEnemyGridFn={this.updateEnemyGrid}
              gameStats={this.state.gameStats}
              changeTurnFn={this.changeTurn}
            />
            <YourGrid
              grid={this.state.yourGrid}
              gameStats={this.state.gameStats}
              changeTurnFn={this.changeTurn}
            />
            <LeaderBoard
              friendStats={this.state.friendStats}
              gameStats={this.state.gameStats}
            />
            <Ships />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, loggedIn } = state;
  return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(Gameroom));
