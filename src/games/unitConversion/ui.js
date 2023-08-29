const onNumClick = (n) => () => window.num(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          .در این بازی با انتخاب هر گزینه، بالای آن ترتیب گزینه‌های انتخابی درج می‌گردد. در صورت تغییر ترتیب انتخاب، تنها کافی است روی گزینه مجدد کلیک نمائید
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
          در این بازی چند عدد با واحدهای مختلف نمایش داده می‌شود. شما می‌بایست واحدها را به یکدیگر تبدیل کرده و با توجه به صورت سوال، آنها را از کم به زیاد (یا برعکس) انتخاب نمائید
        </div>
        <div>
          دقت داشته باشید که هر یارد 90 سانتی متر، هر فوت 30 سانتی متر، هر اینچ برابر با 2.5 سانتی متر و هر 10 میلیمتر برابر با 1 سانتی متر می باشد
        </div>
        <div>
          برای تبدیل یارد به سانتی متر: عدد را در 90 ضرب می‌کنیم
        </div>
        <div>
          برای تبدیل فوت به سانتی متر: عدد را در 30 ضرب می‌کنیم
        </div>
        <div>
          برای تبدیل میلیمتر به سانی مترت: عدد را به 10 تقسیم می‌کنیم
        </div>
        <div>
          برای تبدیل اینچ به سانتی متر: عدد را به 2ونیم تقسیم می‌کنیم
        </div>
        <div>
          برای تبدیل یارد به اینچ: ابتدا عدد را به سانتی متر تبدیل کرده و بعد یک صفر جلوی آن می‌گذاریم و تقسیم بر 4 می‌کنیم.  مثلا 6 یارد چند اینچ است؟ ابتدا 6  را در 90 ضرب میکنیم که برابر است با 540، بعد یک صفر اضافه میکنیم که 5400 می‌شود، سپس تقسیم بر 4 می‌کنیم (برای تقسیم بر 4 هم می‌توانیم عدد را دو بار نصف کنیم)
        </div>
      </div>
    )
  }
}


const Block = (props) => {
  return (
    <div className="options" onClick={onNumClick(props.num)}>
      <div className="sort"></div>
      <div className="num"></div>
      <div className="un"></div>
    </div>
  )
}

class GameUI extends React.Component {
  render() {
    return (
      <div className="BackGround" id="BackGround">
        <div className="inf" id="inf"></div>
        <Block num={0} />
        <Block num={1} />
        <Block num={2} />
        <Block num={3} />
      </div>
    )
  }
}