const selF = (n) => () => window.selectBox(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی جدولی نمایش داده می شود که مسیری در آن مشخص گردیده است. سپس مسیر مشخص شده خاموش شده و شما می بایست به ترتیب روی مربع های جدول کلیک کرده تا آن مسیر را طی نمائید.
      </div>
      <div>
        دقت داشته باشید شروع حرکت شما همیشه از چپ به راست می باشد.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی می‌بایست یک دید کلی نسبت به جدول داشته باشید. و به محض نمایش مسیر، با چشم خود یک عکس  از آن گرفته و به خاطر بسپارید. سپس در صفحه جواب به ترتیبآن را وارد نمائید.
      </div>
    </div>
  )
}

const MeshBox = (props) => {
  return (
    <div className="boxContainer " id={"bc" + (props.id)}>
      <div className="boxBack" id={"d" + (props.id)} onClick={selF(props.id)}>{/* {props.id} */}</div>
    </div>
  )
}

const MeshColumn = (props) => {
  return (
    <div className="d-flex flex-column">
      {Array.from(Array(props.rowCount).keys()).map((index) =>
        <MeshBox key={index} id={(props.columnInd * props.rowCount) + index} />
      )}
    </div>
  )
}

const BoxMesh = (props) => {
  return (
    <>
      {Array.from(Array(props.rowCount).keys()).map((index) => (
        <div className="d-flex" key={index}>
          <MeshColumn columnInd={index} rowCount={props.columnCount} />
          {gData.gameDef[window.gameCurLevel].xStepLimit.indexOf(index + 1) !== -1 ? (
            <div className='columnSeperator' />
          ) : null}
        </div>
      ))}
    </>
  );
};




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