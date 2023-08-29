

const sound = new Audio('./sound.mp3');

let tAns, tInd;
let qArr = new Array();
let qMode = false;
let divCount = 9

qModFunc = function () {
  qMode = false;
  document.getElementsByClassName('first')[0].style.backgroundImage = "url('./img/"+ gData.gameDef[window.gameCurLevel].fNum +"/img(" + qArr[tInd] + ").jpg')";
  for (i = 1; i < divCount + 1; i++) {
    document.getElementById('d' + i).style.backgroundImage = "url('./img/q.png')";
  }
};

ansCheck = function (inNum) {
  qMode = true;
  if (inNum == tInd) {
    setScore(1)
    nextQuestion()
  } else {
    setScore(-1)
    document.getElementById('d' + (tInd + 1)).style.backgroundImage = "url('./img/" + gData.gameDef[window.gameCurLevel].fNum + "/img(" + qArr[tInd] + ").jpg')";
    timeOut = setTimeout(nextQuestion, gData.answerDelay);
  }
};

fQuestion = function () {
  qMode = true;
  picMax = gData.picArr[gData.gameDef[window.gameCurLevel].fNum - 1]
  picCount = randRange(gData.gameDef[window.gameCurLevel].picCountMin, gData.gameDef[window.gameCurLevel].picCountMax, 1);
  document.getElementsByClassName('first')[0].style.backgroundImage = "url('./img/q.png')";
  qArr = arrRandomSelect(arrCreateSeries(1, picMax, 1), picCount);
  tAns = qArr[randRange(0, qArr.length - 1, 1)];
  qArr.length = divCount;
  qArr = arrRandomSelect(qArr, divCount);
  for (i = 1; i < divCount + 1; i++) {
    if (qArr[i - 1] == tAns) {
      tInd = i - 1;
    }
    if (qArr[i - 1] != undefined) {
      document.getElementById('d' + i).style.backgroundImage = "url('./img/" + gData.gameDef[window.gameCurLevel].fNum +"/img(" + qArr[i - 1] + ").jpg')";
    } else {
      document.getElementById('d' + i).style.backgroundImage = 'none';
    }
  }
  console.log(qArr);
  console.log(tAns);
  console.log(tInd);
};


function qDivClick() {
  if (qMode) {
    qModFunc()
  }
}

function aDivClick(i) {
  let aDiv = document.getElementById('d' + i)
  if (!qMode) {
    ansCheck(aDiv.id.substr(1, aDiv.id.length) - 1)
  }
}

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};