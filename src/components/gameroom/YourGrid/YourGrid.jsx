import React, { Component } from "react";
import "./yourGrid.scss";
import '../EnemyGrid/enemyGrid.scss'
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Swal from 'sweetalert2'
import hit from '../../assets/hit.png'
import miss from '../../assets/splash.png'

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
      horizontal: false,
      shipsPlaced: false,
      gameStats: {}
    };
  }

  componentDidMount() {
    // this.setShips()
    this.setState({ grid: this.props.grid })
  }

  componentDidUpdate(prevProps) {
    if (this.props.grid !== prevProps.grid) {
      this.setState({ grid: this.props.grid });
    }
    if (this.props.gameStats !== prevProps.gameStats) {
      this.setState({gameStats: this.props.gameStats})
    }
  }


  setShips(e, i1, i2) {


    if (!this.props.gameStats.ships_placed && this.props.gameStats.turn === this.props.user.user.user_id) {
  
  
  
      switch(this.state.ship) {
      case('carrier'):
        this.setCarrier(e, i1, i2)
        
        break
      case('battleship'):
        this.setBattleship(e, i1, i2)
        
        break
      case('cruiser'):
        this.setCruiser(e, i1, i2)
        
        break
      case('submarine'):
        this.setSubmarine(e, i1, i2)
        
        break
      case('destroyer'):
        this.setDestroyer(e, i1, i2)
        
        break
      default:
        console.log('Something went wrong')
        break
    }
  
    }
  
  }
  
  sendData() {

    if (this.state.shipsPlaced) {
    }
  }
    
  setCarrier(e, i1, i2) {
  
    let newGrid = this.state.grid
    if (this.state.horizontal) {
      
      if (i1 + 4 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1 + 1][i2] === 0 && newGrid[i1 + 2][i2] === 0 && newGrid[i1 + 3][i2] === 0 && newGrid[i1 + 4][i2] === 0) {
        newGrid[i1][i2] = 5
        newGrid[i1 + 1][i2] = 5
        newGrid[i1 + 2][i2] = 5
        newGrid[i1 + 3][i2] = 5
        newGrid[i1 + 4][i2] = 5
        this.setState({grid: newGrid})
        this.setState({ship: 'battleship'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place carrier here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      
      if (i2 + 4 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1][i2 + 1] === 0 && newGrid[i1][i2 + 2] === 0 && newGrid[i1][i2 + 3] === 0 && newGrid[i1][i2 + 4] === 0) {
        newGrid[i1][i2] = 5
        newGrid[i1][i2 + 1] = 5
        newGrid[i1][i2 + 2] = 5
        newGrid[i1][i2 + 3] = 5
        newGrid[i1][i2 + 4] = 5
        this.setState({grid: newGrid})
        this.setState({ship: 'battleship'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place carrier here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  

  setBattleship(e, i1, i2) {
    let newGrid = this.state.grid
    if (this.state.horizontal) {
      
      if (i1 + 3 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1 + 1][i2] === 0 && newGrid[i1 + 2][i2] === 0 && newGrid[i1 + 3][i2] === 0) {
        newGrid[i1][i2] = 4
        newGrid[i1 + 1][i2] = 4
        newGrid[i1 + 2][i2] = 4
        newGrid[i1 + 3][i2] = 4
        this.setState({grid: newGrid})
        this.setState({ship: 'cruiser'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place battleship here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      
      if (i2 + 3 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1][i2 + 1] === 0 && newGrid[i1][i2 + 2] === 0 && newGrid[i1][i2 + 3] === 0) {
        newGrid[i1][i2] = 4
        newGrid[i1][i2 + 1] = 4
        newGrid[i1][i2 + 2] = 4
        newGrid[i1][i2 + 3] = 4
        this.setState({grid: newGrid})
        this.setState({ship: 'cruiser'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place battleship here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  
  
  
  
  setCruiser(e, i1, i2) {
    let newGrid = this.state.grid
    if (this.state.horizontal) {
      
      if (i1 + 2 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1 + 1][i2] === 0 && newGrid[i1 + 2][i2] === 0) {
        newGrid[i1][i2] = 3
  
        newGrid[i1 + 1][i2] = 3
  
        newGrid[i1 + 2][i2] = 3
  
        this.setState({grid: newGrid})
  
        this.setState({ship: 'submarine'})
  
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place cruiser here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      
      if (i2 + 2 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1][i2 + 1] === 0 && newGrid[i1][i2 + 2] === 0) {
        newGrid[i1][i2] = 3
        newGrid[i1][i2 + 1] = 3
        newGrid[i1][i2 + 2] = 3
        this.setState({grid: newGrid})
        this.setState({ship: 'submarine'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place cruiser here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  
  setSubmarine(e, i1, i2) {
    let newGrid = this.state.grid
    if (this.state.horizontal) {
      
      if (i1 + 2 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1 + 1][i2] === 0 && newGrid[i1 + 2][i2] === 0) {
        newGrid[i1][i2] = 1
        newGrid[i1 + 1][i2] = 1
        newGrid[i1 + 2][i2] = 1
        this.setState({grid: newGrid})
        this.setState({ship: 'destroyer'})
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place submarine here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      
      if (i2 + 2 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1][i2 + 1] === 0 && newGrid[i1][i2 + 2] === 0) {
        newGrid[i1][i2] = 1
        newGrid[i1][i2 + 1] = 1
        newGrid[i1][i2 + 2] = 1
        this.setState({grid: newGrid})
        this.setState({ship: 'destroyer'})
      }  else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place submarine here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  setDestroyer(e, i1, i2) {
    let newGrid = this.state.grid
    if (this.state.horizontal) {
      
      if (i1 + 1 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1 + 1][i2] === 0) {
        newGrid[i1][i2] = 2
        newGrid[i1 + 1][i2] = 2
        this.setState({grid: newGrid})
        Swal.fire({
          type: 'success',
          text: 'Your ships have been placed!',
          showConfirmButton: false,
          timer: 1000
        })
        this.props.changeTurnFn()
        if(this.props.gameStats.host_id !== this.props.user.user.user_id){
          // this.props.shipsSetFn()
          // this.forceUpdate()
        }
        axios.put(`/api/game/start/${this.props.gameStats.gameroom_id}/${this.props.user.user.user_id}`, {grid: this.state.grid}).then(res => {
        })
      } else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place destroyer here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      
      if (i2 + 1 <= 9 && newGrid[i1][i2] === 0 && newGrid[i1][i2 + 1] === 0) {
        newGrid[i1][i2] = 2
        newGrid[i1][i2 + 1] = 2
        this.setState({grid: newGrid})
        Swal.fire({
          type: 'success',
          text: 'Your ships have been placed!',
          showConfirmButton: false,
          timer: 1000
        })
        this.props.changeTurnFn()
        axios.put(`/api/game/start/${this.props.gameStats.gameroom_id}/${this.props.user.user.user_id}`, {grid: this.state.grid}).then(res => {
        })
      }  else {
        Swal.fire({
          type: 'error',
          text: 'Cannot place destroyer here!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  directionChange = () => {
    this.setState({horizontal: !this.state.horizontal})
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
            return <div id="carrier" className="yeet">
            </div>;

          case 6:
            return <div id="miss" className="yeet"><img src={miss} alt="Miss Fire"/></div>;

          case 7:
            return <div id="hit" classname="yeet"><img src={hit} alt="Ship Hit"/></div>;

          default:
            return <div className="yeet"></div>;
        }
      });
    });
        // console.log(this.props.gameStats.total_turns)
    return (
      <div className='outerboi'>
        {+this.props.gameStats.total_turns <= 0 ?  (
          <div className='instructions'>
          <div className='shipset'>
            <p>{`Set the ${this.state.ship.charAt(0).toUpperCase() + this.state.ship.slice(1)}`}</p>
          </div>
          {!this.state.horizontal ? (
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
          ) : null  }
          <p className='grid-names'>Your Grid</p>
        <div onClick={this.nice} className="container">
          {mappedGrid}
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
