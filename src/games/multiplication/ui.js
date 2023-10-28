const selF = (n) => () => window.selectFunc(n)

const Box = (props) => {
  return (
    <div className="wrds" id={"b" + props.num} onClick={selF(props.num)}></div>
  )
}

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی، جدولی نمایش داده می شود که در برخی خانه ها دو عدد در یکدیگر ضرب شده و در برخی دیگر حاصل ضرب دو عدد می باشد. شما می بایست این خانه ها را دو به دو با هم انتخاب نمائید. به طور مثال در خانه ای 3*5 نوشته شده است. شما باید خانه ای که 15 نوشته شده را انتخاب کنید.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی در مراحل ابتدایی، ضرب اعداد ساده تر بوده و کار به ترتیب سخت تر و پیچیده تر خواهد شد.
      </div>
      <div>
        دقت داشته باشید که در انتخاب خانه ها تفاوتی وجود ندارد. بعبارتی فرق نخواهد داشت که ابتدا ضرب اعداد را انتخاب کنید یا پاسخ را.
      </div>
    </div>
  )
}

class GameUI extends React.Component {
  render() {
    let cellArr = Array.from(Array(20).keys())
    return (
      <div className="game">
        {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} />)}
      </div>
    )
  }
}