const nF = (n) => () => window.num(n)

const GameDis = () => {
  return (
    <div>
      <div>
        .در این بازی به ازای هر حرف، روی حرف مورد نظر کلیک نموده و در نهایت گزینه تائید را انتخاب کنید
      </div>
      <div>
        به فاصله بین کلمات دقت داشته و در صورت اشتباه وارد کردن پاسخ نیز می‌توانید از دکمه "حذف" استفاده نمائید.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی، کلمه‌ای برای چند ثانیه نمایش داده می‌شود. سپس می‌بایست با توجه به صفحه کلید نمایش داده شده، کلمه انتخابی را تایپ نموده و روی گزینه تائید بزنید. دقت داشته باشید که در مراحل بالاتر، تعداد حروف کلمات بیشتر می‌گردد.
      </div>
      <div>
        در این بازی ابتدا جای حروف را روی اعداد یاد گرفته و سپس به راحتی می‌توانید کلمه مدنظر را با توجه به آن وارد نمائید.
      </div>
    </div>
  )
}

const Key = (props) => {
  return (
    <div className="keys" onClick={nF(numToChFa(props.text + 1))}>{numToChFa(props.text + 1)}</div>
  )
}

const GameUI = () => {
  let cellArr = Array.from(Array(33).keys())
  return (
    <div className="BackGround" id="BackGround"> 
      <div id='soundBox' className="fas fa-music fa-3m text-info" style={{ fontSize: '3rem' }} />
      <div id="keyContainer" className='d-none'>
        <div className="Monitor" id="Monitor" />
        <div className="Keyboard" id="Keyboard">
          {cellArr.map((cellArr) => <Key key={cellArr} text={cellArr} />)}
          <div className="keys flex-wrap" style={{ fontSize: '1.5rem' }} onClick={nF('sp')} >فاصله</div>
          <div className="keys flex-wrap" style={{ fontSize: '1.5rem' }} onClick={nF('d')} >حذف</div>
          <div className="keys flex-wrap" style={{ fontSize: '1.5rem' }} onClick={nF('a')}>تایید</div>
        </div>
      </div>
    </div>
  )
}