
const qClick = () => () => window.qDivClick()
const aClick = (n) => () => window.ansCheck(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        در زمانی که جدول شامل چند عکس است به منزله آن است که صفحه سوال نمایش داده شده و شما می‌بایست روی علامت سوال کلیک نمائید. و وقتی صفحه خالی بوده و در کنار آن عکسی نشان داده می‌شود، شما بایستی جای صحیح عکس مورد سوال را در جدول اعلام نمائید.      </div>
    )
  }
}


class Help extends React.Component {
  render() {
    return (
      <div>
        <div>
          .در این بازی جدولی 3*3 شامل چندین عکس نمایش داده می‌شود. پس از به خاطر سپردن جای عکس‌ها روی علامت سوال کلیک نمائید. سپس جای یکی از عکس‌ها از شما پرسیده شده و می‌بایست جانمایی صحیح آن را در جدول نشان دهید
        </div>
        <div>
          .دقت داشته باشید که در مراحل بالاتر، تعداد عکس‌های نمایش داده شده بیشتر خواهد شد
        </div>
        <div>
          .در روزهای ابتدایی می‌توانید تنها چند خانه از جدول را ملاحظه نمائید. ولی هر چه مهارت شما بیشتر  تعداد خانه‌هایی که در نظر می‌گیرد نیز بیشتر خواهد شد
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