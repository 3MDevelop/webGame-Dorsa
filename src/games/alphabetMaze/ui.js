const selF = (n) => () => window.selectBox(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی، جدولی از حروف  نمایش داده می شود. شما می بایست حروف متوالی را انتخاب کرده که در مجموع یک کلمه معنادار را بسازند.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی، در برخی مراحل، کلمه مدنظر نشان داده شده و شما تنها می بایست مسیر حروف آن را پیدا و مشخص نمائید. ولی هر چه مراحل سخت تر می گردد، کار پیچیده تر شده و در مراحل پایانی، بدون نمایش کلمه مدنظر، شما می بایست آن را پیدا کنید.
      </div>
      <div>
        دقت داشته باشید که مسیر حرکت شما می توانید از بالا به پائین یا برعکس، و از راست به چپ و یا برعکس باشد.
      </div>
    </div>
  )
}

const MeshBox = (props) => {
  return (
    <div className="MeshBox" id={"d" + (props.id)} onClick={selF(props.id)} />
  )
}

const MeshRow = (props) => {
  return (
    <div className="d-flex">
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
  let rowCount = Math.sqrt(gData.gameDef[window.gameCurLevel].cellCount)
  let columnCount = Math.sqrt(gData.gameDef[window.gameCurLevel].cellCount)
  return (
    <div className="BackGround" id="BackGround">
      <div className="Monitor d-none" id="Monitor" />
      <div className='boxContainer d-none' id='boxContainer'>
        <BoxMesh rowCount={rowCount} columnCount={columnCount} />
      </div>
    </div>
  )
}