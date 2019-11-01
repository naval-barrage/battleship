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

  //   componentDidMount = () => {
  //     const container = document.getElementById("container");
  //     let rows = document.getElementsByClassName("gridRow");
  //     // let cells = document.getElementsByClassName("cell");

  //     defaultGrid();
  //     //Creates a default grid sized 16x16
  //     function defaultGrid() {
  //       makeRows(10);
  //       makeColumns(10);
  //     }

  //     //Takes (rows, columns) input and makes a grid
  //     function makeRows(rowNum) {
  //       //Creates rows
  //       for (let r = 0; r < rowNum; r++) {
  //         let row = document.createElement("div");
  //         container.appendChild(row).className = "gridRow";
  //       }
  //     }

  //     //Creates columns
  //     function makeColumns(cellNum) {
  //       for (let i = 0; i < rows.length; i++) {
  //         for (let j = 0; j < cellNum; j++) {
  //           let newCell = document.createElement("div");
  //           rows[j].appendChild(newCell).className = "cell";
  //         }
  //       }
  //     }
  //   };

  render() {
    const mappedGrid = this.state.grid.map(element => {
      return element.map(element2 => {
        switch (element2) {
          case 0:
            return <div id="empty" className="yeet"></div>;

          case 1:
            return (
              <div id="sub" className="yeet">
                
              </div>
            );

          case 2:
            return (
              <div id="destroyer" className="yeet">
                
              </div>
            );

          case 3:
            return (
              <div id="cruiser" className="yeet">
                
              </div>
            );

          case 4:
            return (
              <div id="battleship" className="yeet">
                
              </div>
            );

          case 5:
            return (
              <div id="carrier" className="yeet">
                
              </div>
            );

          case 6:
            return (
              <div id="hit" className="yeet">
                
              </div>
            );

          case 7:
            return (
              <div id="miss" classname="yeet">
                
              </div>
            );

          default:
            return <div className="yeet"></div>;
        }
      });
    });

    // const mappedGrid = this.state.grid.map((element, y)
    // ).map((element, x) => {
    //                 return <div></div>
    //             })

    /*
    for (let i = 0; i < this.state.grid.length; i++) {
      for (let j = 0; j < i.length; j++) {
        if (i[j] === 0) {
          return "empty";
        }
        if (i[j] === 1) {
          return "submarine";
        }
        if (i[j] === 2) {
          return "destroyer";
        }
        if (i[j] === 3) {
          return "cruiser";
        }
        if (i[j] === 4) {
          return "battleship";
        }
        if (i[j] === 5) {
          return "carrier";
        }
        if (i[j] === 6) {
          return "miss";
        } else return "hit";
      }
    }
        */
    //         const container = document.getElementById("container");
    // let rows = document.getElementsByClassName("gridRow");
    // let cells = document.getElementsByClassName("cell");

    // // Creates a default grid sized 16x16
    // function defaultGrid() {
    //     makeRows(16);
    //     makeColumns(16);
    // }

    // // Takes (rows, columns) input and makes a grid
    // function makeRows(rowNum) {

    //     // Creates rows
    //     for (let r = 0; r < rowNum; r++) {
    //         let row = document.createElement("div");
    //         container.appendChild(row).className = "gridRow";
    //     };
    // };

    // // Creates columns
    // function makeColumns(cellNum) {
    //     for (let i = 0; i < rows.length; i++) {
    //         for (let j = 0; j < cellNum; j++) {
    //             let newCell = document.createElement("div");
    //             rows[j].appendChild(newCell).className = "cell";
    //         };

    //     };
    // };

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
