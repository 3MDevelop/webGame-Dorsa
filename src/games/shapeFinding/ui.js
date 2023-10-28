const selF = (n) => () => window.selectBox(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی، جدولی از تصاویر مختلف نمایش داده می شود که در بالای آن ی کلمه درج گردیده است. شما می بایست تصویر متناظر کلمه را در جدول مربوطه پیدا و مشخص نمائید.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی، با توجه به ابعاد جدول بهتر است یک دید کلی نسبت به جدول داشته باشید و به جای تمرکز بر روی تک تک خانه ها، تمامی جدول را با هم بررسی کنید.
      </div>
    </div>
  )
}

const MeshBox = (props) => {
  return (
    <div className="boxCont" id={"bc" + (props.id)}>
      <div className="MeshBox" id={"d" + (props.id)} onClick={selF(props.id)} />
    </div>
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
  let rowCount = gData.gameDef[window.gameCurLevel].cellXCount
  let columnCount = gData.gameDef[window.gameCurLevel].cellYCount
  return (
    <div className="BackGround" id="BackGround">
      <div className="Monitor" id="Monitor" />
      <div className='boxContainer' id='boxContainer'>
        <BoxMesh rowCount={rowCount} columnCount={columnCount} />
      </div>
    </div>
  )
}