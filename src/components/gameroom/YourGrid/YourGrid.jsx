import React, { Component } from "react";
import "./yourGrid.scss";
import '../EnemyGrid/enemyGrid.scss'
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Swal from 'sweetalert2'

class YourGrid extends Component {
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

      grid: [],
      ship: 'carrier',
      horizontal: true,
      shipsPlaced: false
    };
  }

  componentDidMount() {
    // this.setShips()
  }

  componentDidUpdate(prevProps) {
    if (this.props.grid !== prevProps.grid) {
      this.setState({ grid: this.props.grid });
    }
  }

  setShips(e, i1, i2) {
    if (
      this.props.gameStats.ships_placed &&
      this.props.gameStats.turn === this.props.user.user.user_id
    ) {
      switch (this.state.ship) {
        case "carrier":
          console.log("carrier");
          this.setCarrier(e, i1, i2);
          this.setState({ ship: "battleship" });
          break;
        case "battleship":
          this.setBattleship(e, i1, i2);
          this.setState({ ship: "cruiser" });
          console.log("battleship");
          break;
        case "cruiser":
          console.log("cruiser");
          this.setCruiser(e, i1, i2);
          this.setState({ ship: "submarine" });
          break;
        case "submarine":
          console.log("submarine");
          this.setSubmarine(e, i1, i2);
          this.setState({ ship: "destroyer" });
          break;
        case "destroyer":
          console.log("destroyer");
          this.setDestroyer(e, i1, i2);
          this.setState({ ship: "all ships placed" });
          axios
            .put(
              `/api/game/start/${this.props.gameStats.gameroom_id}/${this.props.user.user.user_id}`,
              { grid: this.state.grid }
            )
            .then(res => {
              console.log(res.data);
            });
          Swal.fire({
            type: 'success',
            text: 'Your ships have been placed!',
            showConfirmButton: false,
            timer: 1000
          })
          this.props.changeTurnFn();
          break;
        default:
          console.log("Something went wrong");
          break;
      }
    }
  }

  setCarrier(e, i1, i2) {
    let newGrid = this.state.grid;
    if (this.state.horizontal) {
      console.log(i1, i2);
      if (i1 + 4 <= 9) {
        newGrid[i1][i2] = 5;
        newGrid[i1 + 1][i2] = 5;
        newGrid[i1 + 2][i2] = 5;
        newGrid[i1 + 3][i2] = 5;
        newGrid[i1 + 4][i2] = 5;
        this.setState({ grid: newGrid });
      } else {
        alert("cannot place ship here");
      }
    } else {
      if (i2 + 4 <= 9) {
        newGrid[i1][i2] = 5;
        newGrid[i1][i2 + 1] = 5;
        newGrid[i1][i2 + 2] = 5;
        newGrid[i1][i2 + 3] = 5;
        newGrid[i1][i2 + 4] = 5;
        this.setState({ grid: newGrid });
      }
    }
  }

  setBattleship(e, i1, i2) {
    let newGrid = this.state.grid;
    if (this.state.horizontal) {
      if (i1 + 3 <= 9) {
        newGrid[i1][i2] = 4;
        newGrid[i1 + 1][i2] = 4;
        newGrid[i1 + 2][i2] = 4;
        newGrid[i1 + 3][i2] = 4;
        this.setState({ grid: newGrid });
      } else {
        alert("cannot place ship here");
      }
    } else {
      if (i2 + 3 <= 9) {
        newGrid[i1][i2] = 4;
        newGrid[i1][i2 + 1] = 4;
        newGrid[i1][i2 + 2] = 4;
        newGrid[i1][i2 + 3] = 4;
        this.setState({ grid: newGrid });
      }
    }
  }

  setCruiser(e, i1, i2) {
    let newGrid = this.state.grid;
    if (this.state.horizontal) {
      if (i1 + 2 <= 9) {
        newGrid[i1][i2] = 3;
        newGrid[i1 + 1][i2] = 3;
        newGrid[i1 + 2][i2] = 3;
        this.setState({ grid: newGrid });
      } else {
        alert("cannot place ship here");
      }
    } else {
      if (i2 + 2 <= 9) {
        newGrid[i1][i2] = 3;
        newGrid[i1][i2 + 1] = 3;
        newGrid[i1][i2 + 2] = 3;
        this.setState({ grid: newGrid });
      }
    }
  }

  setSubmarine(e, i1, i2) {
    let newGrid = this.state.grid;
    if (this.state.horizontal) {
      if (i1 + 2 <= 9) {
        newGrid[i1][i2] = 1;
        newGrid[i1 + 1][i2] = 1;
        newGrid[i1 + 2][i2] = 1;
        this.setState({ grid: newGrid });
      } else {
        alert("cannot place ship here");
      }
    } else {
      if (i2 + 2 <= 9) {
        newGrid[i1][i2] = 1;
        newGrid[i1][i2 + 1] = 1;
        newGrid[i1][i2 + 2] = 1;
        this.setState({ grid: newGrid });
      }
    }
  }

  setDestroyer(e, i1, i2) {
    let newGrid = this.state.grid;
    if (this.state.horizontal) {
      if (i1 + 1 <= 9) {
        newGrid[i1][i2] = 2;
        newGrid[i1 + 1][i2] = 2;
        this.setState({ grid: newGrid });
      } else {
        alert("cannot place ship here");
      }
    } else {
      if (i2 + 1 <= 9) {
        newGrid[i1][i2] = 2;
        newGrid[i1][i2 + 1] = 2;
        this.setState({ grid: newGrid });
      }
    }
  }

  render() {
    const mappedGrid = this.state.grid.map((element, i1) => {
      return element.map((element2, i2) => {
        switch (element2) {
          case 0:
            return (
              <div
                id="empty"
                className="yeet"
                onClick={() => this.setShips(element2, i1, i2)}
              ></div>
            );

          case 1:
            return <div id="sub" className="yeet"></div>;

          case 2:
            return <div id="destroyer" className="yeet"></div>;

          case 3:
            return <div id="cruiser" className="yeet"></div>;

          case 4:
            return <div id="battleship" className="yeet"></div>;

          case 5:
            return <div id="carrier" className="yeet"></div>;

          case 6:
            return <div id="miss" className="yeet"></div>;

          case 7:
            return <div id="hit" classname="yeet"></div>;

          default:
            return <div className="yeet"></div>;
        }
      });
    });

    return (
      <div className='outerboi'>
        <div className='instructions'>
          <div className='shipset'>
            <p>{`Set the ${this.state.ship.charAt(0).toUpperCase() + this.state.ship.slice(1)}`}</p>
          </div>
          {this.state.horizontal ? (
            <div>
              <button className='horizontal' onClick={this.directionChange}><i class="fas fa-sync-alt"></i>Horizontal</button>
            </div>
            ) : (
              <button className='horizontal' onClick={this.directionChange}><i class="fas fa-sync-alt"></i>Vertical</button>
          )}
          {this.state.ship === 'carrier' ? (
            <div className='type-of-ship'>
              <div className="carrier-box"></div>
              <div className="carrier-box"></div>
              <div className="carrier-box"></div>
              <div className="carrier-box"></div>
              <div className="carrier-box"></div>
            </div>
            ) : null}
          {this.state.ship === 'battleship' ? (
            <div className='type-of-ship'>
              <div className="battleship-box"></div>
              <div className="battleship-box"></div>
              <div className="battleship-box"></div>
              <div className="battleship-box"></div>
            </div>
            ) : null}
          {this.state.ship === 'cruiser' ? (
            <div className='type-of-ship'>
              <div className="cruiser-box"></div>
              <div className="cruiser-box"></div>
              <div className="cruiser-box"></div>
            </div>
            ) : null}
          {this.state.ship === 'submarine' ? (
            <div className='type-of-ship'>
              <div className="sub-box"></div>
              <div className="sub-box"></div>
              <div className="sub-box"></div>
            </div>
            ) : null}
          {this.state.ship === 'destroyer' ? (
            <div className='type-of-ship'>
              <div className="destroyer-box"></div>
              <div className="destroyer-box"></div>
            </div>
          ) : null}
        </div>

        <div onClick={this.nice} className="container">
          {mappedGrid}
          {/* {mappedyeezy} */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, loggedIn } = state;
  return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(YourGrid));
