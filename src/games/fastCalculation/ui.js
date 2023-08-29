const onNumClick = (n) => () => window.num(n)

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی می‌بایست تا نمایش تمامی اعداد شکیبا باشید و آنها را با یکدیگر جمع و تفریق نمائید. پس از آنکه اعداد به اتمام رسید، یک صفحه کلید نمایش داده می‌شود که شما می‌توانید پاسخ صحیح را با استفاده از آن وارد نموده (و یا حتی با استفاده از اعداد کیبورد سیستم و گوشی) و بر روی گزینه تائید بزنید.
        </div>
        <div>
          در صورت اشتباه وارد کردن عدد نیز می‌توانید از دکمه "حذف" استفاده نمائید.
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
          در این بازی می‌بایست اعداد نمایش داده شده را با یکدیگر جمع نموده و در پایان، حاصل را به عنوان پاسخ صحیح وارد نمائید.
        </div>
        <div>
          لازم به ذکر است که این بازی شامل 9 مرحله به صورت ذیل می‌باشد؛
        </div>
        <div>
          - مرحله اول تا سوم: اعداد 0 تا 9
        </div>
        <div>
          - مرحله چهارم تا ششم: اعداد 1 تا 50
        </div>
        <div>
          - مرحله هفتم تا نهم: اعداد 1 تا 100
        </div>
        <div>
          پس از گذر از حد نصاب هر مرحله، به مرحله بعد صعود خواهید نمود. و در پایان 9 مرحله، انتظار می‌رود در محاسبه سریع مهارت پیدا نمائید.
        </div>
        <div>
          در این بازی شما می‌بایست در ابتدا اعداد مکمل را فرا بگیرید. به طور مثال،
        </div>
        <div>
          1&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;9 ... 10&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;90 ... 100&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;900 ......
        </div>
        <div>
          2&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;8 ... 20&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;80 ... 200&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;800 ......
        </div>
        <div>
          3&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;7 ... 30&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;70 ... 300&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;700 ......
        </div>
        <div>
          4&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;6 ... 40&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;60 ... 400&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;600 ......
        </div>
        <div>
          5&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;5 ... 50&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;50 ... 500&nbsp;&nbsp;<span className="fas fa-arrow-left" style={{ fontSize: '0.5rem' }} />&nbsp;&nbsp;500 ......
        </div>
        <div>
          زمانی که روی اعداد مکمل یک رقمی مسلط شدید، دو رقمی، سه رقمی و ... به همین ترتیب خواهد بود. در اعداد دو رقمی و بالاتر، شما می‌بایست ابتدا یکان اعداد را تکمیل و سپس دهگان، صدگان و ... را تکمیل نمائید.
        </div>
        <div>
          مثال: مکمل عدد 36 برابر با 64 می‌باشد (برای عدد 100).
        </div>
      </div>
    )
  }
}

class GameUI extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="Monitor" id="Monitor">
          <div className="text_in"></div>
        </div>
        <div className="Keyboard" id="Keyboard">
          <div onClick={onNumClick(1)}>1</div>
          <div onClick={onNumClick(2)}>2</div>
          <div onClick={onNumClick(3)}>3</div>
          <div onClick={onNumClick(4)}>4</div>
          <div onClick={onNumClick(5)}>5</div>
          <div onClick={onNumClick(6)}>6</div>
          <div onClick={onNumClick(7)}>7</div>
          <div onClick={onNumClick(8)}>8</div>
          <div onClick={onNumClick(9)}>9</div>
          <div onClick={onNumClick("d")} style={{ fontSize: '1.8rem' }}>حذف</div>
          <div onClick={onNumClick(0)}>0</div>
          <div onClick={onNumClick("n")} style={{ fontSize: '1.8rem' }}>+ / -</div>
          <div onClick={onNumClick("a")} style={{ fontSize: '1.8rem' }}>تایید</div>
        </div>
      </div >
    )
  }
}


