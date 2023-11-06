
let allGameData;

const hasData = (cardData) => {
  const data = localStorage.getItem(cardData);
  if (data === "[0]" || data === null) {
    localStorage.setItem(cardData, "[0]")
    return false
  } else {
    return true
  }
};

const delStorage = () => {
  localStorage.clear()
  location.reload()
};

const GameItem = (props) => {
  const havePoint = hasData(props.add);
  // Function to check if the image exists
  const checkImageExists = (imageSrc, callback) => {
    var img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = imageSrc;
  };

  const [imageExists, setImageExists] = React.useState(true);

  React.useEffect(() => {
    checkImageExists(`./games/${props.add}/icon.png`, setImageExists);
  }, [props.add]);

  return (
    <div className="card border border-gray border-2 overflow-hidden me-3 mb-3">
      {imageExists ? (
        <img
          className="card-img-top"
          src={`./games/${props.add}/icon.png`}
          alt="img"
        />
      ) : (
        <img
          className="card-img-top"
          src="./lib/img/dataNotLoaded.svg"
          alt="img"
        />
      )}

      <div className="card-body p-0 m-0 ">
        <div className="card-title text-center bg-light m-0 py-1 text-muted w-100">{props.gameName}</div>
        <div className=" text-center p-0 d-flex justify-content-center align-items-center fs-6" style={{ cursor: 'pointer' }}>
          <div onClick={() => {
            if (imageExists) {
              window.location.href = "./games/" + props.add
            }
          }}
            className={"fas py-2 text-white flex-fill bg-info " + (imageExists ? "fa-play" : "fa-ban")} />
          {havePoint && (
            <div
              id={props.add}
              className="fas fa-undo-alt text-white bg-warning py-2 flex-fill"
              onClick={() => {
                delStorage(props);
                document.getElementById(props.add).classList.add('d-none')
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const GameList = (props) => {
  return (
    <div className="gamesList col-12 col-md-8 m-0 p-0 d-flex flex-column justify-content-between align-items-center overflow-hidden">
      <div className="listHeader d-flex justify-content-center align-items-center w-100 fs-4 py-4">فهرست بازی ها</div>
      <div className="list d-flex m-3 p-3 pe-0">
        <div className="d-flex flex-wrap">
          {props.list.map((gameItem) => (
            <GameItem
              gameName={gameItem.name}
              add={gameItem.path}
              key={gameItem.path}
            />
          ))}

        </div>
      </div>
      <div className="listFooter d-flex justify-content-center align-items-center w-100 py-1">
        {/* <button type="button" className="btn btn-danger btn-sm txtEng" onClick={() => { delStorage()}}>Reset All Games</button> */}
      </div>
    </div>
  );
};

fetch("./games/gamesList.json")
  .then((response) => response.json())
  .then((data) => {
    allGameData = data
    console.info(allGameData)
    ReactDOM.render(
      <GameList list={data.dataGame} />,
      document.getElementById('root')
    );
  });
