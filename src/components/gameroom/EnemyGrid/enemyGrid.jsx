import React, {Component} from 'react'
import './enemyGrid.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import hit from '../../assets/hit.png'
import miss from '../../assets/splash.png'

class EnemyGrid extends Component {
    constructor() {
        super()
        this.state = {
            // 0 = empty
            // 1 = submarine(3)
            // 2 = destroyer(2)
            // 3 = cruiser(3)
            // 4 = battleship(4)
            // 5 = carrier(5)
            // 6 = miss
            // 7 = hit
            
            enemyGrid : [],
            ship_sunk: false,
            isTurn: false,
            message: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props.grid !== prevProps.grid) {
            this.setState({enemyGrid: this.props.grid})
        }
        if (this.props.gameStats !== prevProps.gameStats) {
            if (this.props.gameStats.turn === this.props.user.user.user_id) {
                this.setState({isTurn: true})
            }
        }
    }

    // This is the function that will be called after the move is made.
    // If there was a hit pass in the string 'hit' as well as 'miss' if the turn result is a miss

    updateGame = (turn_result) => {
        let ships = false
        for(let i = 0; i < this.state.enemyGrid.length; i++) {
            if (this.state.enemyGrid[i].includes(1) === true || this.state.enemyGrid[i].includes(2) === true || this.state.enemyGrid[i].includes(3) === true || this.state.enemyGrid[i].includes(4) === true || this.state.enemyGrid[i].includes(5) === true) {
                ships = true
            }
        }
        console.log(ships)
        if (ships === true) {
            this.props.changeTurnFn()
            this.setState({isTurn: false})
            axios.put(`/api/game/${+this.props.match.params.gameroom_id}/${this.props.user.user.user_id}?turn_result=${turn_result}&ship_sunk=${this.state.ship_sunk}`, {grid: this.state.enemyGrid, message: this.state.message}).then(res => {
            })
        } else {
            axios.delete(`/api/games/end/${this.props.match.params.gameroom_id}/${this.props.user.user.user_id}`).then(res => {
            })
            axios.put(`/api/users/img/${this.props.user.user.user_id}`).then(res => {
            })
            alert('you won!')
            this.props.history.push('/home')
            }
        

        
    }

    onYeet = (e, i1, i2) => {
        if (this.state.isTurn && !this.props.gameStats.ship_placed) {

            if (e === 1 || e === 2 || e === 3 || e === 4 || e === 5) {
                let newGrid1 = this.state.enemyGrid;
                let val = this.state.enemyGrid[i1][i2]
                newGrid1[i1][i2] = 7;
                let ship = false
                for (let i = 0; i < this.state.enemyGrid.length; i++) {
                    if (this.state.enemyGrid[i].includes(val) === true) {
                        ship = true
                    }
                }
                if (ship) {
                    Swal.fire({
                        type: 'success',
                        text: 'You hit an enemy ship!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({
                    enemyGrid: newGrid1,
                    message: 'The enemy hit your ship!'
                }, () => this.updateGame('hit'));
                
                } else {
                    Swal.fire({
                        type: 'success',
                        text: 'You sunk an enemy ship!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({
                        enemyGrid: newGrid1,
                        message: 'The enemy sunk your ship!'
                    }, () => this.updateGame('hit'))
                
                }
                
            } else {
            let newGrid = this.state.enemyGrid;
            newGrid[i1][i2] = 6;
            Swal.fire({
                type: 'warning',
                text: 'Miss fire!',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({
                enemyGrid: newGrid,
                message: 'The enemy missed!'
            }, () => this.updateGame('miss'));
        }
        }
    
};
render() {
    const mappedGrid = this.state.enemyGrid.map((element, i1) => {
    return element.map((element2, i2) => {
        switch (element2) {
        case 0:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 1:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 2:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 3:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 4:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 5:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="empty"
                className="yeet"
            ></div>
            );

        case 6:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="miss"
                className="yeet"
            ><img src={miss} alt="Miss Fire!"/></div>
            );

        case 7:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="hit"
                classname="yeet"
            ><img src={hit} alt="Ship hit!"/></div>
            );

        default:
            return (
            <div
                onClick={() => this.onYeet(element2, i1, i2)}
                className="yeet"
            ><img src={hit} alt="Ship Hit"/></div>
            );
        }
    });
    });

    return (
    <div>
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

export default connect(mapStateToProps)(withRouter(EnemyGrid));
