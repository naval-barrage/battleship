import React, {Component} from 'react'
import './enemyGrid.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

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
            ship_sunk: false
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    componentDidUpdate(prevProps) {
        if (this.props.grid !== prevProps.grid) {
            this.setState({enemyGrid: this.props.grid})
        }
    }

    // This is the function that will be called after the move is made.
    // If there was a hit pass in the string 'hit' as well as 'miss' if the turn result is a miss

    updateGame = (turn_result) => {
        axios.put(`/api/game/${+this.props.match.params.gameroom}/${this.props.user.user.user_id}?turn_result=${turn_result}&ship_sunk=${this.state.ship_sunk}`, this.state.enemyGrid).then(res => {
            
        })
    }

    render() {
        return(
            <div className='EmyGrid'>
                Emy Grid
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(withRouter(EnemyGrid));
