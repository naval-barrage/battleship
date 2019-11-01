import React, { Component } from "react";
import "./yourGrid.scss";

export default class YourGrid extends Component {
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
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 6, 0],
        [0, 0, 3, 0, 0, 7, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
        [5, 5, 5, 5, 5, 0, 0, 0, 6, 0]
      ]
    };
  }

  render() {
    const mappedGrid = this.state.grid.map(element => {
      return element.map(element2 => {
        switch (element2) {
          case 0:
            return <div id="empty" className="yeet"></div>;

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
            return <div id="hit" className="yeet"></div>;

          case 7:
            return <div id="miss" classname="yeet"></div>;

          default:
            return <div className="yeet"></div>;
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
