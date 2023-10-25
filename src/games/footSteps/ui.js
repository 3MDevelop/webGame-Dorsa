const selF = (n) => () => window.selectBox(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی، در ابتدا جدولی نشان داده می شود که چند رد پا به ترتیب در برخی خانه ها روشن می گردد. شما می بایست ترتیب نمایش رد پاها را به خاطر سپرده و پس از تغییر رنگ جدول، آن خانه ها را به ترتیب کلیک نمائید.
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