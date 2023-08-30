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
        .در این بازی هر دو کلمه‌ای که صحیح انتخاب نمائید، حذف می‌گردد و کار به مراتب ساده‌تر خواهد شد
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        .در این بازی جدولی نمایش داده می‌شود. شما می‌بایست کلمات هم معنی (و یا متضاد) را دو به دو با یکدیگر انتخاب نمائید
      </div>
      <div>
        .در ابتدا یک نگاه اجمالی روی تمامی کلمات داشته باشید تا دیدی وسیع‌تر پیدا کنید. سپس به راحتی می‌توانید کلمه هم معنی (یا متضاد) را پیدا نمائید
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