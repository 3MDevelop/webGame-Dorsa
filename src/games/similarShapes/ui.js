const nF = (n) => () => window.num(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          .در این بازی، در ابتدا یک جدول شامل تعدادی شکل نشان داده می‌شود، سپس جدول حذف شده و شما می‌بایست انواع اشکال موجود در جدول را بیان نمائید. دقت فرمائید که هدف تنوع اشکال است، نه تعداد کلی اشکال
        </div>
      </div>
    )
  }
}

class Help extends React.Component {
  render() {
    return (
      <div>
        <div>
          .در این بازی جدولی شامل چندین نوع شکل نمایش داده می‌شود. پس از چند ثانیه جدول حذف شده و شما می‌بایست تعداد انواع اشکال را بیان نمائید
        </div>
        <div>
          .در این بازی با توجه به کمتر بودن تعداد سطرها نسبت به ستون‌ها، توصیه می‌شود سطر به سطر اشکال را ملاحظه نموده و تعداد انواع شکل‌ها را به خاطر بسپارید
        </div>
      </div>
    )
  }
}

const Box = (props) => {
  return (
    <div className="fkeys" id={"d" + (props.num)} ></div>
  )
}

class GameUI extends React.Component {
  render() {
    
    let cellArr = Array.from({ length: gData.gameDef[window.gameCurLevel].cellCount }, (_, i) => i + 1)
    return (
      <div className="BackGround">
        <div className="First_Div" id="firstDiv">
          {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} />)}
        </div>
        <div className="Sec_Div" id="secDiv">
          <div className="Keyboard" id="Keyboard">
            <div id="op1" onClick={nF(1)}>1</div>
            <div id="op2" onClick={nF(2)}>2</div>
            <div id="op3" onClick={nF(3)}>3</div>
            <div id="op4" onClick={nF(4)}>4</div>
          </div>
        </div>
      </div>
    )
  }
}