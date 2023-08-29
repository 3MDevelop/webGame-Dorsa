/* const divClk = (inID,innerHtml) => {
  console.info(innerHtml)
  window.divClick(inID)
} */
class GameDis extends React.Component {
  render() {
    return (
      <div>
        در این بازی تنها با کلیک بر روی عدد مورد نظر، پاسخ صحیح نشان داده شده و جدول یا سوال بعدی به صورت خودکار نمایش داده می‌شود.
      </div>
    )
  }
}

class Help extends React.Component {
  render() {
    return (
      <div >
        <div>
          در این بازی جدولی شامل اعداد 1 تا 20 نمایش داده می‌شود. شما می‌بایست عددی را انتخاب نمائید که مکمل آن با عدد 20 وجود نداشته باشد.
        </div>
        <div>
          در این بازی شما می‌توانید در ابتدا جدول را بررسی نمائید تا دو عدد 10 داشته باشد. اگر چنین نبود، پاسخ عدد 10 است. در غیر اینصورت، می‌توانید وجود اعداد 1 تا 19 را در جدول بررسی نمائید. هر عددی که وجود نداشت، مکمل آن پاسخ مد نظر خواهد بود.
        </div>
      </div>

    )
  }
}

const Box = (props) => {
  const handleBoxClick = (event) => {
    const clickedBox = event.target;
    const innerHTML = clickedBox.innerHTML;
    /* divClk(props.num, innerHTML) */; // Pass num and innerHTML to divClk function
    if (!clickedBox.selected) {
      divClick(event.target)
    }
    clickedBox.selected = true
  };
  return (
    <div
      className={
        gData.gameDef[window.gameCurLevel].numCount === 25 ? "box boxLayout3" :
          gData.gameDef[window.gameCurLevel].numCount === 16 ? "box boxLayout2" :
            gData.gameDef[window.gameCurLevel].numCount === 9 ? "box boxLayout1" : "box"
      }
      id={"d" + props.num}
      num={props.num}
      selected={false}
      onClick={handleBoxClick}
    ></div>
  )
}

class GameUI extends React.Component {
  render() {
    let cellArr = Array.from(Array(gData.gameDef[window.gameCurLevel].numCount).keys())
    return (
      <div className="game">
        <div className='w-100 text-center d-flex flex-column justify-content-center flex-fill gameHeader' />
        <div className='boxContainer'>
          {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} />)}
        </div>
      </div>
    )
  }
}