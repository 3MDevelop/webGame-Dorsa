const aClick = (n) => () => window.ansCheck(n)
const qF = () => {
  console.log('qf')
  window.showOption()
}


const Box = (props) => {
  return (
    <div id={'m' + (props.num + 1)} style={{ transform: "rotate(" + (360 / props.total * props.num) + "deg) translateX(160px)" }}>
      <div id={'q' + (props.num + 1)} style={{ transform: "rotate(" + -1 * (360 / props.total * props.num) + "deg)" }}>23</div>
    </div>
  )
}

const QBox = (props) => {
  return (
    <div id={'a' + (props.num + 1)} onClick={aClick(props.num)}></div>
  )
}

class GameUI extends React.Component {
  render() {
    let cellArr = Array.from(Array(gData.gameDef[gameCurLevel].cellCount).keys())
    let cellQArr = Array.from(Array(gData.gameDef[gameCurLevel].cellCount - 1).keys())
    return (
        <div className="game">
          <div className="G_Circle">
            <div className="Numbers">
              {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} total={gData.gameDef[gameCurLevel].cellCount} />)}
            </div>
            <div className="Center" onClick={qF}>
              <div className="QMark">؟</div>
            </div>
          </div>
          <div className="Keyboard">
            {cellQArr.map((cellQArr) => <QBox key={cellQArr} num={cellQArr} />)}
          </div>
        </div>
    )
  }
}