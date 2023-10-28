const nF = (n) => () => window.num(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی، کلمه ای برای شما خوانده می شود و شما می بایست املای صحیح کلمه را وارد نمائید.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی، دقت داشته باشید که با زدن دکمه حذف، آخرین حرف وارد شده حذف می گردد.
      </div>
      <div>
        لازم به ذکر است شما می توانید صفحه کیبورد خود را فارسی نموده و با کیبورد سیستم کلمه را تایپ کنید.
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