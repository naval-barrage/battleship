import React, {Component} from 'react'
import './enemyGrid.scss'

export default class EmyGrid extends Component {
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
            
            enemyGrid : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }
    }
    render() {
        return(
            <div className='EmyGrid'>
                Emy Grid
        </div>
        )
    }
}
