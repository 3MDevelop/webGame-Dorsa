
const sound = new Audio("./sound.mp3");

let qMode, gNxTimer
let qArr = new Array();
let qPArr = new Array();
let ansPArr = new Array();
let selInd
let nxStep = 100



ansCheck = function (inNum) {
  if (!qMode) {
    if (selInd == -1) {
      selInd = inNum;
      document.getElementById('p' + inNum).style.border = "4px solid gray"
    }
    else if (inNum == selInd) {
      selInd = -1;
      document.getElementById('p' + inNum).style.border = "0px solid gray"
    }
    else if (inNum != selInd) {
      qMode = true
      if ((inNum == qArr[0] && selInd == qArr[1]) || (inNum == qArr[1] && selInd == qArr[0])) {
        document.getElementById('p' + inNum).style.border = "4px solid green"
        document.getElementById('p' + selInd).style.border = "4px solid green"
        setScore(1);
      }
      else {
        document.getElementById('p' + inNum).style.border = "4px solid red"
        document.getElementById('p' + selInd).style.border = "4px solid red"
        document.getElementById('p' + qArr[1]).style.border = "4px solid green"
        document.getElementById('p' + qArr[0]).style.border = "4px solid green"
        setScore(-1);
      }
      setTimeout(nextQuestion, gData.answerDelay);
    }
  }

};

function showFunc() {
  qMode = false
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    document.getElementById('p' + i).style.backgroundImage = "url('./img/1/img(" + ansPArr[i] + ").jpg')"
    document.getElementById('p' + i).style.opacity = 1
  }
}

function hideFunc() {
  clearInterval(gNxTimer);
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    document.getElementById('p' + i).style.opacity = 0
  }
  document.getElementById('btn').style.visibility = 'hidden';
  gNxTimer = setTimeout(showFunc, gData.gameDef[gameCurLevel].offTime);
}


function nextTimerFunc() {
  document.getElementById('btnBack').style.width = stPos + "%"
  stPos = stPos + (100 / nxStep)
  if (stPos > 100) {
    nxBtnPos = true
    hideFunc()
  }
}

function nxTimer() {
  stPos = 0
  gNxTimer = setInterval(nextTimerFunc, gData.gameDef[gameCurLevel].showTime / 100);
}

function nxBtnFunc() {
  if (nxBtnPos) {
    nextQuestion()
  }
}


function fQuestion() {
  document.getElementById('btnBack').style.width = 0
  document.getElementById('btn').style.visibility = 'visible';
  clearInterval(gNxTimer);
  picMax = gData.picArr[gData.gameDef[gameCurLevel].fNum - 1]
  qMode = true
  selInd = -1;
  ansPArr.length = 0;
  console.log(picMax)
  qPArr = arrRandomSelect(arrCreateSeries(1, picMax, 1), gData.gameDef[gameCurLevel].cellCount);
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    ansPArr.push(qPArr[i]);
  }
  console.info(gData.gameDef[gameCurLevel].cellCount)
  qArr = arrRandomSelect(arrCreateSeries(0, gData.gameDef[gameCurLevel].cellCount - 1, 1), 2);
  temp0 = ansPArr[qArr[0]];
  temp1 = ansPArr[qArr[1]];
  ansPArr[qArr[0]] = temp1;
  ansPArr[qArr[1]] = temp0;
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    document.getElementById('p' + i).style.border = "0"
    document.getElementById('p' + i).style.backgroundImage = "url('./img/1/img(" + qPArr[i] + ").jpg')"
    document.getElementById('p' + i).style.opacity = 1
  }
  nxTimer()
  console.log(qArr);
};

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};