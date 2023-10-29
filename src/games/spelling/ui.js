
const qClick = () => () => window.qDivClick()
const aClick = (n) => () => window.ansCheck(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        در این بازی، از میان گزینه های موجود، می بایست گزینه ای که املای صحیح لغت در آن رعایت گردیده و کلمه به درستی نوشته شده است را انتخاب نمائید.
      </div>
    )
  }
}


class Help extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی در مراحل ابتدایی، شما می بایست از میان سه گزینه، املای صحیح را پیدا نمائید. ولی در مراحل بالاتر که توانائی شما بیشتر شده است، تعداد گزینه ها چهار خواهد بود و کار به مراتب سخت تر می گردد.
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
        <div id='optCont' className='optCont d-flex flex-wrap justify-content-around align-items-center' />
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