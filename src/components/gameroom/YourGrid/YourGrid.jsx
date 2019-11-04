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

      grid: []
    };
  }
   pewPew =()=>{

  }
  // onYeet = (e, i1, i2)=>{
  //   console.log(e);
  //   console.log(i1);
  //   console.log(i2);
    
    
  //   if(e === 1 || e === 2 || e === 3 || e === 4 || e === 5 ){
  //      let newGrid1 = this.state.grid
  //      newGrid1[i1][i2] =7
  //      this.setState({
  //        grid: newGrid1
  //      })
  //    }
  //    else {
  //      console.log('test');
  //      let newGrid = this.state.grid
  //      newGrid[i1][i2] = 6
  //     this.setState({
  //       grid: newGrid
  //     }) 
  //     console.log(this.state);
      
       
      
  //   }
     

  // }

  componentDidUpdate(prevProps) {
    if (this.props.grid !== prevProps.grid) {
        this.setState({grid: this.props.grid})
    }
}

  render() {
    const mappedGrid = this.state.grid.map((element, i1) => {
      return element.map((element2, i2) => {
        switch (element2) {
          case 0:
            return <div  id="empty" className="yeet"></div>;

          case 1:
            return <div  id="sub" className="yeet"></div>;

          case 2:
            return <div  id="destroyer" className="yeet"></div>;

          case 3:
            return <div  id="cruiser" className="yeet"></div>;

          case 4:
            return <div  id="battleship" className="yeet"></div>;

          case 5:
            return <div  id="carrier" className="yeet"></div>;

          case 6:
            return <div  id="hit" className="yeet"></div>;

          case 7:
            return <div  id="miss" classname="yeet"></div>;

          default:
            return <div  className="yeet"></div>;
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
