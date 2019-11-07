import React, {Component} from 'react'
import './howTo.scss'
import Nav from './../Nav/Nav'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
// import { updateUser } from "../../redux/reducer";

class HoWTo extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return(
            <div className='HowTo'>
                {!this.props.loggedIn
            ? (
            <div>
                <Link to='/'><button className='HowTo-button'>Back</button></Link>
            </div>
            ) : (
                <div>
                <Nav/>
            </div>
            )}
                <h1>How to play</h1>
                <div className="container-howto">
                <div className="box-howto-1">
                    <h3>Setting up the game.</h3>
                    <p>Each player receives a game board and five ships of varying lengths. The five ships are:</p>
                    <h5>Carrier, which has five holes</h5>
                    <h5>Battleship, which has four holes</h5>
                    <h5>Cruiser, which has three holes</h5>
                    <h5>Submarine, which has three holes</h5>
                    <h5>Destroyer, which has two holes</h5>
                    <p>
                        Before the game starts, each opponent secretly positions his own five ships on the ocean grid by positioning their ships and anchoring on the grid. Each ship can only be placed horizontally or vertically and the ships can't hang off the grid. Ships can touch each other, but they can't occupy the same grid space. You cannot change the position of the ships after the game begins.
                    </p>
                </div>
                <div className="box-howto-2">
                    <h3>Basic Gameplay</h3>
                    <p>Players take turns firing shots (by clicking on the enemy grid) to attempt to hit the opponent's enemy ships.
                        On your turn, click the location where you would like to fire. You then will be notified whether it's a "miss" if there is no ship there, or "hit" if you have correctly guessed a space that is occupied by a ship.
                        Each turn will mark the shots or attempts on you gird. If it was a hit the location will be marked red, and if it was a miss then it will be marked black. As the game proceeds, the black areas will gradually identify the size and location of your opponent's ships.
                        When it is your opponent's turn to fire shots at you, each time one of your ships receives a hit, your grid will be updated corresponding hit or miss indicators. When one of your ships has every slot filled with red pegs, you will be notified that the opponent that he has sunk your ship. It is, of course, illegal to change the hiding position of your ships once play has begun. 
                        The first player to sink all five of his opponent's ships wins the game.</p>
                </div>
                </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    const { user, loggedIn } = state;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(HoWTo);