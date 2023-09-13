const selF = (n) => () => window.selectBox(n)

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

const MeshBox = (props) => {
  return (
    <div className="boxContainer " id={"bc" + (props.id)}>
      <div className="boxBack" id={"d" + (props.id)} onClick={selF(props.id)} />
    </div>
  )
}

const MeshRow = (props) => {
  return (
    <div className="d-flex flex-column">
      {Array.from(Array(props.columnCount).keys()).map((index) =>
        <MeshBox key={index} id={(props.rowInd * props.columnCount) + index} />
      )}
    </div>
  )
}

const BoxMesh = (props) => {
  return (
    <>
      {Array.from(Array(props.rowCount).keys()).map((index) =>
        <MeshRow key={index} rowInd={index} columnCount={props.columnCount} />)}
    </>
  )
}


const GameUI = () => {
  let rowCount = gData.gameDef[window.gameCurLevel].cellXCount
  let columnCount = gData.gameDef[window.gameCurLevel].cellYCount
  return (
    <div className="BackGround" id="BackGround">
      <div className='meshContainer' id='meshContainer'>
        <BoxMesh rowCount={rowCount} columnCount={columnCount} />
      </div>
    </div>
  )
}