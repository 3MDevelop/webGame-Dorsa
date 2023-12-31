
const qClick = () => () => window.qDivClick()
const aClick = (n) => () => window.ansCheck(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        در این بازی، کلمه ای نشان داده شده و از شما خواسته می شود معنی صحیح آن را انتخاب نمائید.
      </div>
    )
  }
}


class Help extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی، کلمه ای نشان داده شده و از شما خواسته می شود معنی صحیح آن را انتخاب نمائید.
        </div>

      </div>
    )
  }
}

const Box = (props) => {
  return (
    <div className="pics" id={"d" + props.id} onClick={aClick(props.id)}></div>
  )
}

class GameUI extends React.Component {
  render() {
    return (
      <div className="game flex-wrap">
        <div className='qBox' />
        <div className='optBoxContainer'>
          <div className='optBox' onClick={aClick(0)} />
          <div className='optBox' onClick={aClick(1)} />
          <div className='optBox' onClick={aClick(2)} />
          <div className='optBox' onClick={aClick(3)} />
        </div>
      </div>
    )
  }
}


/* 

import React, { Component } from 'react';

class HoverDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { isHovered } = this.state;

    // Define the class name based on hover state
    const divClassName = isHovered ? 'hovered-div' : 'normal-div';

    return (
      <div
        className={divClassName}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        Hover over me
      </div>
    );
  }
}

export default HoverDiv;


*/