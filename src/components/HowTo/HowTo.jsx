import React, {Component} from 'react'
import './howTo.scss'
import Nav from './../Nav/Nav'
import {Link} from 'react-router-dom'
// import { connect } from "react-redux";
// import { updateUser } from "../../redux/reducer";

class HoWTo extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false
        }
    }
    render() {
        return(
            <div className='HowTo'>
                {!this.state.loggedIn
            ? (
            <div>
                <Link to='/'><button>Back</button></Link>
            </div>
            ) : (
                <div>
                <Nav/>
            </div>
            )}
                <h1>How to play</h1>
                <div className="container-howto">
                <div className="box-howto">
                    <h3>Setting up the game.</h3>
                    <p>Each player receives a game board and five ships of varying lengths. Each ship has holes where the "hit" pegs are inserted and a supply of hit and miss markers (white and red pegs). The five ships are:</p>
                    <h5>Carrier, which has five holes</h5>
                    <h5>Battleship, which has four holes</h5>
                    <h5>Cruiser, which has three holes</h5>
                    <h5>Submarine, which has three holes</h5>
                    <h5>Destroyer, which has two holes</h5>
                    <p>The two players should be positioned so they face each other across a game table. Their target grids back up to one another vertically so that neither player can see his opponent's ocean grid and ship locations.
                        Before the game starts, each opponent secretly positions his own five ships on the ocean grid (lower part of the board) by positioning their ships and anchoring them into the holes on the grid. Each ship must be placed horizontally or vertically—not diagonally—across grid spaces, and the ships can't hang off the grid. Ships can touch each other, but they can't occupy the same grid space. You cannot change the position of the ships after the game begins.</p>
                </div>
                <div className="box-howto">
                    <h3>Basic Gameplay</h3>
                    <p>Players take turns firing shots (by calling out a grid coordinate) to attempt to hit the opponent's enemy ships.
                        On your turn, call out a letter and a number that identifies a row and column on your target grid. Your opponent checks that coordinate on their ocean grid and verbally responds "miss" if there is no ship there, or "hit" if you have correctly guessed a space that is occupied by a ship.
                        Mark each of your shots or attempts to fire on the enemy using your target grid (upper part of the board) by using white pegs to document your misses and red pegs to register your hits. As the game proceeds, the red pegs will gradually identify the size and location of your opponent's ships.
                        When it is your opponent's turn to fire shots at you, each time one of your ships receives a hit, put a red peg into the hole on the ship corresponding to the grid space. When one of your ships has every slot filled with red pegs, you must announce to your opponent that he has sunk your ship. In classic play, the phrase is "You sunk my battleship!" It is, of course, illegal to change the hiding position of your ships once play has begun. 
                        The first player to sink all five of his opponent's ships wins the game.</p>
                </div>
                </div>
        </div>
        )
    }
}
// function mapStateToProps(state) {
//     const { user } = state;
//     return { user };
// }

export default HoWTo;