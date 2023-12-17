const levelColor = ["#31ad76", "#95bf3d", "#0abbc5", "#C35BA2", "#D480B3", "#F173AC", "#E95752", "#F58220", "#FBAE49"]
const disLevelColor = "#909090"
let timerStep = 10
let isPlaying = false
let isScrFhull = false
let getGoal = false
let timerWidth, gameCurLevel, targetToStar, curTime, gTime, estTime, timerInt, qCount, qCountMax, score, gameEnd, soundPlay, tColor;
const tAlert = new Audio("../../lib/sound/correct.mp3");
const fAlert = new Audio("../../lib/sound/wrong.mp3");
const bAlert = new Audio("../../lib/sound/beep.mp3");
const eAlert = new Audio("../../lib/sound/end.mp3");

function setGameData(inNum) {
  document.getElementById('A').style.backgroundColor = levelColor[inNum]
  document.getElementById('Q').style.backgroundColor = levelColor[inNum]
  for (let index = 0; index < document.getElementsByClassName('lBtns').length; index++) {
    document.getElementsByClassName('lBtns')[index].style.backgroundColor = levelColor[inNum]
  }
  gameCurLevel = inNum
  gTime = window.gData.gameDef[gameCurLevel].gameTime * 1000
  setScore(0)
  setTime()
  sound.loop = true;
  sound.volume = gData.soundLevel
}

soundPlay = true
/* sound.play(); */
function setScore(inNum) {
  // (0 to restart game) -- (-1 to wrong answer) -- (num to true answer) (-2 to next qustion)
  switch (inNum) {
    case 0:
      isPlaying = false
      curTime = 0
      qCountMax = window.gData.gameDef[gameCurLevel].qMax
      targetToStar = 0
      score = 0
      qCount = 0
      gameEnd = false
      document.getElementsByClassName('lStar')[0].style.color = "white";
      document.getElementsByClassName('mStar')[0].style.color = "white";
      document.getElementsByClassName('rStar')[0].style.color = "white";
      document.getElementsByClassName('yBar')[0].style.width = Math.floor(window.gData.gameDef[gameCurLevel].starArr[1] / window.gData.gameDef[gameCurLevel].starArr[2] * 100) + "%"
      document.getElementsByClassName('rBar')[0].style.width = Math.floor(window.gData.gameDef[gameCurLevel].starArr[0] / window.gData.gameDef[gameCurLevel].starArr[2] * 100) + "%";
      document.getElementsByClassName('bBar')[0].style.width = "100%";

      setTimeout(() => {
        clearInterval(timerInt)
      }, 10)
      break
    case -1:
      qCount++
      fAlert.play()
      break
    case -2:
      qCount++
      break
    default:
      qCount++
      score = score + inNum;
      tAlert.play()
      document.getElementsByClassName('bBar')[0].style.width = (100 - Math.floor(score / window.gData.gameDef[gameCurLevel].starArr[2] * 100)) + "%"
      document.getElementsByClassName('bBar')[0].style.borderRadius = "0 7px 7px 0"
      if (score >= window.gData.gameDef[gameCurLevel].starArr[targetToStar]) {
        switch (targetToStar) {
          case 0:
            targetToStar++
            document.getElementsByClassName('mStar')[0].style.color = "red"
            break;
          case 1:
            targetToStar++
            document.getElementsByClassName('lStar')[0].style.color = "red"
            break;
          case 2:
            targetToStar++
            getGoal = true
            document.getElementsByClassName('rStar')[0].style.color = "red"
            userStArr[gameCurLevel] = userStArr[gameCurLevel] + 1
            if (userStArr[gameCurLevel] == gData.gameDef[gameCurLevel].passStar) {
              if (gameCurLevel < 9) {
                gameCurLevel++
                userStArr.push(0)
              }
              gameEndFunc()
              setGameData(gameCurLevel)
            } else {
              gameEndFunc()
            }
            localStorage.setItem(window.location.pathname.split('/')[2], JSON.stringify(userStArr));
            console.info('level = ', gameCurLevel)
            fetch("https://dorsav2.dorsapackage.com/api/v1/updateScore", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                api_token: localStorage.getItem('uT'),
                req: 'updateScore',
                gamePath: window.location.pathname.split('/')[2],
                gameLevel: gameCurLevel,
                gameTime: curTime,
                score: userStArr
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
              })
              .then((scoreUpdateResponse) => {
                console.info(scoreUpdateResponse)
              });
            break;
        }
      }
  }
  document.getElementById('HAtxt').innerHTML = score;
  document.getElementsByClassName('tStarTXT')[0].innerHTML = userStArr[gameCurLevel];
  if (qCount > qCountMax) {
    gameEndFunc()
  } else {
    document.getElementById('HQtxt').innerHTML = qCount + "/" + qCountMax;
  }
  document.getElementById('gameLavelLbl').innerHTML = "مرحله" + (gameCurLevel + 1);
}

// Timer Part ---------------------------------------------------------------------- //
function setTime() {
  estTime = Math.floor((gTime - curTime) / 1000)

  if (isPlaying) {
    curTime = curTime + timerStep
  }
  if (curTime > gTime) {
    gameEndFunc()
  } else {
    timerWidth = curTime / gTime * 100
    if (timerWidth < 70) {
      tColor = "green"
    } else if (timerWidth < 85) {
      tColor = "orange"
    } else if (timerWidth < 100) {
      tColor = "red"
    }
    document.getElementById('timer').style.width = timerWidth + "%"
    document.getElementById('timer').style.backgroundColor = tColor
  }
}

function gameEndFunc() {
  ReactDOM.render(
    (getGoal) ? <GetGoal /> : <StartPage gameEnd={true} />,
    document.getElementById('placeHolder')
  );
  gameEnd = true
  isPlaying = false
  clearInterval(timerInt)
}

function plyBtnFunc(props) {
  if (props == 'play' || props == 'pause') {
    if (!chPrPos()) {
      document.getElementById('plyBtn').style.display = 'flex'
    } else {
      document.getElementById('plyBtn').style.display = 'none'
    }
  } else if (props == 'hide') {
    document.getElementById('plyBtn').style.display = 'none'
  }
}

function rePlayFunc() {
  setScore(0)
  setTimeout(() => {
    playFunc()
  }, 10)
}

function playFunc() {
  getGoal = false
  switch (isPlaying) {
    case true:
      ReactDOM.render(
        <StartPage gameEnd={false} />,
        document.getElementById('placeHolder')
      );
      plyBtnFunc('hide')
      break;

    case false:
      ReactDOM.render(
        <GameUI />,
        document.getElementById('placeHolder')
      );
      setTimeout(() => {
        plyBtnFunc('pause')
        window.fQuestion()
        if (qCount == 0) {
          timerInt = setInterval(() => {
            setTime()
          }, timerStep)
        }
        setScore(-2)
      }, 50);
      break;
  }
  isPlaying = !isPlaying
}

function timeToClock(inTime) {
  let min = ("00" + Math.floor(inTime / 60)).slice(-2)
  let sec = ("00" + (inTime - Math.floor(inTime / 60) * 60)).slice(-2)
  let clock = min + ":" + sec
  return clock
}

/* document.addEventListener('keydown', function (event) {
  event.preventDefault();
  let k = event.key;
  switch (k) {
    case "p":
      playFunc()
      break;
    case "e":
      gameEndFunc()
      break

  }
}); */

const exitFunc = () => {
  window.location.pathname = ""
}

function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

const maxWin = () => {
  if (isScrFhull) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  isScrFhull = !isScrFhull
}

const soundFunc = () => {

  if (window.soundPlay) {
    document.getElementById('sountBtn').className = "nav-item lBtns m-2 m-lg-0 fas fa-volume-mute"
    sound.pause();
    sound.currentTime = 0;
  } else {
    document.getElementById('sountBtn').className = "nav-item lBtns m-2 m-lg-0 fas fa-music"
    sound.play();
  }
  window.soundPlay = !window.soundPlay
}

const levelFunc = () => {
  plyBtnFunc('pause')
  isPlaying = false
  document.getElementById("plyBtn").removeAttribute("fa-pause-circle");
  document.getElementById("plyBtn").classList.add("fa-play-circle")
  ReactDOM.render(
    <GameLevels />,
    document.getElementById('placeHolder')
  );
}

function infoFunc() {
  plyBtnFunc('pause')
  document.getElementById("plyBtn").removeAttribute("fa-pause-circle");
  document.getElementById("plyBtn").classList.add("fa-play-circle")
  isPlaying = false
  ReactDOM.render(
    <AppInfo />,
    document.getElementById('placeHolder')
  );
}

function helpFunc() {
  plyBtnFunc('pause')
  document.getElementById("plyBtn").removeAttribute("fa-pause-circle");
  document.getElementById("plyBtn").classList.add("fa-play-circle")
  isPlaying = false
  ReactDOM.render(
    <GameHelp />,
    document.getElementById('placeHolder')
  );
}

function chPrPos() {
  if (window.innerWidth < window.innerHeight) {
    return true
  } else {
    return false
  }
}

//--- UI Part ---
const Ribbon = (props) => {
  return (
    <div className={"ribbon " + props.rClass} style={{ backgroundColor: props.rColor, height: props.rHeight }}>
      <div>{props.title}</div>
    </div>
  );
};


// --- Header UI Section
const LeftBtns = () => {
  return (
    <div id="leftBtns" className="col-1 col-lg-3 h-100 m-0 p-0">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid m-0 p-0 my-3">
          <button className="navbar-toggler p-0 mt-2 mb-4" type="button" data-bs-toggle="collapse"
            data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fas fa-bars"></span>
          </button>
          <div className="collapse collapse-horizontal navbar-collapse" id="nav">
            <div id="leftBtnContainer" className="navbar-nav w-100 justify-content-between align-items-center">
              <div className="nav-item lBtns m-2 m-lg-0 fas fa-sign-out-alt" onClick={exitFunc} />
              <div className="nav-item lBtns m-2 m-lg-0 fas fa-info-circle" onClick={infoFunc} />
              <div className="nav-item lBtns m-2 m-lg-0 fas fa-window-maximize" onClick={maxWin} id='fullBtn' />
              <div className={"nav-item lBtns m-2 m-lg-0 fas " + (window.soundPlay ? "fa-music" : "fa-volume-mute")} onClick={soundFunc} id='sountBtn' />
              <div className="nav-item lBtns m-2 m-lg-0 fas fa-cog" onClick={levelFunc} />
              <div className="nav-item lBtns m-2 m-lg-0 fas fa-question-circle" onClick={helpFunc} />
              <div
                id="plyBtn"
                className={
                  "nav-item lBtns m-2 m-lg-0 fas" +
                  (isPlaying ? " fa-pause-circle" : " fa-pause-circle")
                }
                style={{ display: 'none' }}
                onClick={playFunc}
              />

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

const Logo = () => {
  return (
    <div id="logo" className="col-2 h-100 d-flex justify-content-center align-items-center">
      <img className="img-fluid img-responsive logo" src="../../lib/img/logo.png" />
    </div>
  )
}

const QA = () => {
  return (
    <div className="col-3 col-lg-3 h-100" id="QAContainer">
      <div className="text-white d-flex flex-column justify-content-center py-2 h-100" id="QA">
        <div id="Q" className="mb-1">
          <div className="fas fa-question-circle" />
          <div id="HQtxt">88/88</div>
        </div>
        <div id="A" className="mt-1">
          <div className="fas fa-check-circle" />
          <div id="HAtxt">50</div>
        </div>
      </div>
    </div>
  )
}

const StarSt = () => {
  return (
    <div className="col-3 col-lg-4 h-100 p-0 m-0 mt-1 actCenter">
      <div className="starSt">
        <div className="stars">
          <div className="lStar fas fa-star" />
          <div className="mStar fas fa-star fa-2x" />
          <div className="rStar fas fa-star" />
        </div>
        <div className="bars">
          <div className="yBar" />
          <div className="rBar" />
          <div className="bBar" />
          <div className="sBar" />
        </div>
        <div id="gameLavelLbl" className="actCenter" />
      </div>
    </div>

  )
}

const TStar = () => {
  return (
    <div className="col-3 col-lg-4 h-100 actCenter">
      <div className="tStar">
        <div className="backShadow" />
        <div className="tStarBack" />
        <div className="tStarTXT">25</div>
        <div className="backRibbon2" />
        <div className="backRibbon" />
        <div className="lST1 fas fa-star" />
        <div className="lST2 fas fa-star" />
        <div className="lST3 fas fa-star" />
      </div>
    </div>


  )
}

const RightState = () => {
  return (
    <div id="rightState" className="col-9 col-lg-3 h-100 d-flex justify-content-center align-items-center">
      <div className="container-fluid d-flex flex-row align-items-center justify-content-between h-100 px-1 m-0">
        <QA />
        <StarSt />
        <TStar />
        <PauseBtn />
      </div>
    </div>
  )
}

const PauseBtn = () => {
  return (
    <div className="col-2 d-flex d-lg-none fas fa-play bg-info lBtns" onClick={playFunc} />
  )
}

const Header = () => {
  return (
    <div id="headerContainer" className="container-fluid m-0 p-0 d-flex justify-content-center align-items-center">
      <LeftBtns />
      <Logo />
      <RightState />
    </div>
  )
}

// --- Timer UI Section
const TimerContainer = () => {
  return (
    <div id="timerContainer" className="container-fluid p-0 d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-8 h-100 d-flex justify-content-start justify-content-lg-center overflow-hidden"
        id="timerback">
        <div className=" h-100" id="timer" />
      </div>
    </div>
  )
}

const HeaderContainer = () => {
  return (
    <div className="container-fluid m-0 p-0 d-flex flex-column">
      <Header />
      <TimerContainer />
    </div>
  )
}

// --- Footer UI Section
const FooterContainer = () => {
  return (
    <div className="container-fluid bg-secondary d-flex actCenter text-light d-display-4" id="footerContainer">
      All Write Reseved by 3M Develop on CPH
    </div>
  )
}

const GameLogo = () => {
  return (
    <div style={{ width: 64, marginBottom: 20 }}>
      <img className="img-fluid img-responsive rounded-3 h-100" src="./icon.png"
        alt="Game Logo" />
    </div>
  )
}

const StartPageBtn = (props) => {
  return (
    <div className="d-flex mt-3">
      <button
        type="button"
        className="justify-content-center btn btn-primary btn-lg btn-floating rounded-pill mx-3 border border-danger border-2 spBtns"
        style={(props.gameEnd) ? { display: 'none' } : { display: 'flex' }}
        onClick={playFunc}
      >
        <div className="fas fa-play" />
      </button>

      <button
        type="button"
        className="justify-content-center btn btn-primary btn-lg btn-floating rounded-pill mx-3 border border-danger border-2 spBtns"
        style={(props.curTime == 0) ? { display: 'none' } : { display: 'flex' }}
        onClick={rePlayFunc}
      >
        <div className="fas fa-redo" />
      </button>
    </div>
  )
}

const GetGoal = (props) => {
  return (
    <div className="modalContent goalPage">
      <div className='mb-3'>
        <div className='fas fa-star' style={{ fontSize: '3rem', transform: "rotate(30deg)", color: 'gold' }} />
        <div className='fas fa-star' style={{ fontSize: '4rem', color: 'gold' }} />
        <div className='fas fa-star' style={{ fontSize: '3rem', transform: "rotate(-30deg)", color: 'gold' }} />
      </div>
      <Ribbon title='تبریک ... شما سه ستاره دریافت کردید' rHeight='70px' rClass='my-2' />
      <div className="d-flex mt-3">
        <button
          type="button"
          className="justify-content-center btn btn-primary btn-lg btn-floating rounded-pill mx-3 border border-danger border-2 spBtns"
          style={(props.gameEnd) ? { display: 'none' } : { display: 'flex' }}
          onClick={rePlayFunc}
        >
          <div className="fas fa-play" />
        </button>
      </div>
    </div>
  )
}


const StartPage = (props) => {
  return (
    <div className="modalContent">
      <GameLogo />
      <Ribbon title={gData.gameName} />
      <div className='rulesText'>
        <GameDis />
      </div>
      <StartPageBtn gameEnd={props.gameEnd} curTime={props.curTime} />
    </div>
  )
}

const LevelItem = (props) => {
  let lColor, opa
  if (props.id < userStArr.length) {
    lColor = levelColor[props.id]
    opa = "100%"
  } else {
    lColor = disLevelColor
    opa = "50%"
  }
  return (
    <div className="container-fluid m-0 p-0 w-100 mt-2 mb-2 d-flex justify-content-between overflow-hidden" style={{ opacity: opa }}
      id="levelItem" onClick={() => {
        setGameData(props.id)
        playFunc()
      }}>

      <div id="levelPlayBtn" style={{ backgroundColor: lColor }}
        className=" col-1 col-lg-1 d-flex justify-content-center align-items-center text-light">
        <span className="fas fa-play"></span>
      </div>

      <div id="LIUStarContainer" className="col-1 col-lg-2 d-flex justify-content-center align-items-center">

        <div id="LIUStar" style={{ backgroundColor: lColor }}
          className="d-flex flex-column flex-lg-row-reverse justify-content-center justify-content-lg-between align-items-center text-light container-fliud overflow-hidden">
          <div className="col-3 d-flex justify-content-center align-items-center fas fa-star" />
          <div className="col-3 d-flex justify-content-center align-items-center">{window.gData.gameDef[props.id].passStar}</div>
          <div className="col-4 d-flex justify-content-center align-items-center">{(props.id < window.userStArr.length) ? window.userStArr[props.id] : "0"}</div>
        </div>

      </div>

      <div className="col-7">
        <div
          className="container-fluid h-100 d-flex flex-column-reverse flex-lg-row m-0 p-0 justify-content-end align-items-center">

          <div id="LIStarLimit"
            className="container col-12 col-lg-5 text-white d-flex justify-content-between align-items-center m-0 p-0 px-0 px-lg-3">

            <div className="d-flex h-100 justify-content-center align-items-center">
              <div id="LIStarLimitText" style={{ color: lColor }}>{window.gData.gameDef[props.id].starArr[0]}</div>
              <div id="LIStarLimitIcon" style={{ backgroundColor: lColor }}
                className="d-flex flex-column justify-content-center align-items-center h-100 px-1 rounded-pill">
                <div id="LIStarLimitStar1" className="fas fa-star" />
              </div>
            </div>

            <div className="d-flex h-100 justify-content-center align-items-center">

              <div id="LIStarLimitText" style={{ color: lColor }}>{window.gData.gameDef[props.id].starArr[1]}</div>
              <div id="LIStarLimitIcon" style={{ backgroundColor: lColor }}
                className="d-flex flex-column justify-content-center align-items-center h-100 px-1 rounded-pill">
                <div id="LIStarLimitStar1" className="fas fa-star mb-1" />
                <div id="LIStarLimitStar1" className="fas fa-star mt-1" />
              </div>
            </div>

            <div className="d-flex h-100 justify-content-center align-items-center">
              <div id="LIStarLimitText" style={{ color: lColor }}>{window.gData.gameDef[props.id].starArr[2]}</div>
              <div id="LIStarLimitIcon" style={{ backgroundColor: lColor }}
                className="d-flex flex-column justify-content-center align-items-center h-100 px-1 rounded-pill">
                <div id="LIStarLimitStar2" className="fas fa-star mb-1" />
                <div id="LIStarLimitStar1" className="fas fa-star" />
                <div id="LIStarLimitStar2" className="fas fa-star mt-1" />
              </div>
            </div>

          </div>
          <div id="LIScoreLimit"
            className="col-12 col-lg-6 container-fluid text-white d-flex justify-content-between align-items-center mx-3 px-3">

            <div className="col-6 d-flex justify-content-center">
              <div id="levelItemQCountTxt" className="d-flex justify-content-center align-items-center mx-2" style={{ color: lColor }}>{window.gData.gameDef[props.id].qMax}
              </div>
              <img id="levelItemQCountIcon" className="img-fluid img-responsive" src="../../lib/img/quest.svg" />
            </div>

            <div className="col-6 d-flex justify-content-center">
              <div id="levelItemTCountTxt" className="d-flex justify-content-center align-items-center mx-2" style={{ color: lColor }}>{timeToClock(window.gData.gameDef[props.id].gameTime)}
              </div>
              <img id="levelItemTCountIcon" className="img-fluid img-responsive" src="../../lib/img/time.svg" />
            </div>

          </div>
        </div>
      </div>

      <div id="LIMedal" style={{ backgroundColor: lColor }} className="position-relative col-1 d-flex justify-content-center align-items-center">
        <div id="LIMedalTxt" className="position-absolute text-secondary">{props.id + 1}</div>
        <img id="LIMedalIcon" className="img-fluid img-responsive" src="../../lib/img/medal-2.svg" />
      </div>

    </div>
  )
}

const GameLevels = () => {
  const levelCount = Array.from({ length: 9 }, (_, index) => index);
  return (
    <div className="modalContent">
      <Ribbon title="مراحل بازی" rClass='mb-2' />
      <div className="overflow-auto">
        {levelCount.map((id) => (
          <LevelItem key={id} id={id} color={levelColor[id]} />
        ))}
      </div>
    </div>
  );
};

const AppInfo = () => {
  return (
    <div className="modalContent">
      <Ribbon title='راهنمای کلی نرم افزار' />
      <div className="rulesText">
        <div>
          .به منظور دریافت قانون انجام بازی می‌توانید بر روی آیکون "علامت سوال" در بالای صفحه بزنید
        </div>
        <div>
          .به منظور تغییر مرحله بازی، می‌توانید بر روی آیکون "چرخ دنده" در بالای صفحه بزنید
        </div>
        <div>
          .به منظور تمام صفحه کردن بازی، می‌توانید بر روی آیکون "تمام صفحه" در بالای صفحه بزنید
        </div>
        <div>
          .به منظور دریافت توضیح و لِم بازی، می‌توانید بر روی آیکون "اطلاعات بازی" در بالای صفحه بزنید
        </div>
        <div>
          .دقت داشته باشید که در بالای صفحه سمت راست، اطلاعاتی اعم از تعداد سوال کل و تعداد سوال‌های پاسخ داده شده، زمان بازی، مرحله بازی و تعداد ستاره‌های دریافت شده در این بازی نمایش داده می شود
        </div>
      </div>
    </div>
  )
}

const GameHelp = () => {
  return (
    <div className="modalContent">
      <Ribbon title='راهنمای کلی بازی' />
      <div className="rulesText">
        <Help />
      </div>
    </div>
  )
}

const GameContainer = (props) => {
  return (
    <div
      id="placeHolder"
      className="container-fluid p-0 col-12 col-lg-8 d-flex flex-fill justify-content-center align-items-center"
      style={{ maxWidth: 750, maxHeight: 600 }}
    >
      {props.target}
    </div>
  )
}

const App = () => {
  React.useEffect(() => {
    window.setGameData(userStArr.length - 1)
  }, [])
  return (
    <>
      <div id="mainContainer"
        className="position-relative p-0 m-0 d-flex flex-column justify-content-between align-items-center">
        <HeaderContainer />
        <GameContainer target={<StartPage gameEnd={false} curTime={0} />} />
        <FooterContainer />
      </div>
    </>
  )
}

let gData;
let gDataDef = new Array();
let userStArr;

fetch("data.json")
  .then(response => response.json())
  .then(json => {
    gData = json;
    const storedData = JSON.parse(localStorage.getItem(window.location.pathname.split('/')[2]));
    console.info(gData.userGrade)
    let usergrade = 1
    gData.userGrade[usergrade - 1].map((val) => {
      gDataDef.push(gData.gameDef[val - 1])
    })
    console.info(gDataDef)
    if (storedData) {
      userStArr = storedData.map((element) => {
        return typeof element === "string" ? +element : element;
      });
      console.info(userStArr)
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
      /* localStorage.removeItem(window.location.pathname.split('/')[2]) */
    } else {
      console.log('user data not loadded')
    }
  });

