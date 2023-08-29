const divClk = (n) => () => window.divClick(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی هر قطعه‌ای که در جدول انتخاب می‌شود مشخص شده و اگر مجدد روی آن کلیک کنید، از حالت انتخاب خارج خواهد شد.        </div>
      </div>
    )
  }
}

class Help extends React.Component {
  render() {
    return (
      <div style={{ 'direction': 'rtl' }}>
        <div>
          در این بازی جدولی شامل قطعه‌های رنگی نمایش داده می‌شود. شما می‌بایست در این جدول مستطیلی انتخاب نمائید تا هر چهار رأس آن یک رنگ باشد. دقت داشته باشید که هر چه مستطیل انتخابی بزرگ‌تر باشد، امتیاز بیشتری نیز به دست خواهید آورد.
        </div>
        <div>
          لازم به ذکر است در مراحل بالاتر، تنوع رنگ‌های نمایش داده شده در جدول بیشتر خواهد بود.
        </div>
        <div>
          در مراحل ابتدایی بهتر است از رنگ‌هایی که تفاوت بیشتری با سایر رنگ‌ها دارند شروع کنید تا با بازی آشنایی پیدا کرده و سپس چشمتان با رنگ‌های دیگر نیز آشنا شده و به راحتی هم رنگ‌ها را می‌توانید پیدا کنید.
        </div>
      </div>
    )
  }
}

const Box = (props) => {
  return (
    <div id={"d" + (props.num)} className="pics" onClick={divClk(props.num)}></div>
  )
}



class GameUI extends React.Component {
  render() {
    let cellArr = Array.from(Array(63).keys())
    return (
      <div className="BackGround">
        <div className="gameArea">
          {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} />)}
        </div>
        <div className="scoreBox" id="scoreBox">16</div>
      </div>
    )
  }
}