import React, { Component } from "react";
import "./enemyGrid.scss";

export default class EmyGrid extends Component {
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

      grid: [
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
    };
  }
  onYeet = (e, i1, i2) => {
    console.log(e);
    console.log(i1);
    console.log(i2);

    if (e === 1 || e === 2 || e === 3 || e === 4 || e === 5) {
      let newGrid1 = this.state.grid;
      newGrid1[i1][i2] = 7;
      this.setState({
        grid: newGrid1
      });
    } else {
      console.log("test");
      let newGrid = this.state.grid;
      newGrid[i1][i2] = 6;
      this.setState({
        grid: newGrid
      });
      console.log(this.state);
    }
  };
  render() {
    const mappedGrid = this.state.grid.map((element, i1) => {
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
                id="sub"
                className="yeet"
              ></div>
            );

          case 2:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="destroyer"
                className="yeet"
              ></div>
            );

          case 3:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="cruiser"
                className="yeet"
              ></div>
            );

          case 4:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="battleship"
                className="yeet"
              ></div>
            );

          case 5:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="carrier"
                className="yeet"
              ></div>
            );

          case 6:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="hit"
                className="yeet"
              ></div>
            );

          case 7:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                id="miss"
                classname="yeet"
              ></div>
            );

          default:
            return (
              <div
                onClick={() => this.onYeet(element2, i1, i2)}
                className="yeet"
              ></div>
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
        <div></div>
      </div>
    );
  }
}
