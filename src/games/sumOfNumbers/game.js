const sound = new Audio('./sound.mp3');

let stPos = 0
let nxStep = 500
let count = 0;
let ansArr = new Array();
let sum = 0;
let ansTime, nxBtnPos
let qMode = true

function divReset() {
  ansArr.forEach(element => {
    document.getElementById(element).style.backgroundColor = "white"
    document.getElementById(element).style.color = "#961035"
  });
  setScore(-1)
  sum = 0;
  ansArr.length = 0
  ansTime = true
}

function divSetTrue() {
  ansArr.forEach(element => {
    document.getElementById(element).style.backgroundColor = "green"
    document.getElementById(element).innerText = ""
  });
  setScore(1)
  sum = 0;
  ansArr.length = 0
}

function ansCh(id) {
  if (ansTime) {
    if (document.getElementById(id).innerHTML != "") {
      if (!isValInArr(ansArr, id)) {
        ansArr.push(id)
        sum = sum + document.getElementById(id).num
        document.getElementById(id).style.backgroundColor = "red"
        document.getElementById(id).style.color = "white"
      } else {
        document.getElementById(id).style.backgroundColor = "white"
        document.getElementById(id).style.color = "#961035"
        sum = sum - document.getElementById(id).num
        for (i = 0; i < ansArr.length; i++){
          if (ansArr[i] == id) {
            ansArr.splice(i,1)
          }
        }
      }
    }
    if (sum > gData.gameDef[window.gameCurLevel].sumVal) {
      ansTime = false
      divResetTimer = setTimeout(divReset, gData.resetTime);
    } else if (sum == gData.gameDef[window.gameCurLevel].sumVal) {
      divSetTrue()
    }

  }
}

function nextTimerFunc() {
  document.getElementsByClassName('green')[0].style.width = stPos + "%"
  stPos = stPos + (100 / nxStep)
  if (stPos > 100) {
    document.getElementsByClassName('text')[0].innerText = "صفحه بعدی"
    nxBtnPos = true
    clearInterval(gNxTimer);
  }
}

function nxTimer() {
  stPos = 0
  gNxTimer = setInterval(nextTimerFunc, gData.gameDef[window.gameCurLevel].nextTime * 1000 / nxStep);
}

function nxBtnFunc() {
  if (nxBtnPos) {
    nextQuestion()
  }
}


fQuestion = function () {
  qMode = true;
  ansTime = true
  nxBtnPos = false
  document.getElementsByClassName('text')[0].innerText = ""
  document.getElementsByClassName('green')[0].style.marginRight = "100%"
  if (stPos > 0) {
    clearInterval(gNxTimer);
  }
  nxTimer()
  ansArr.length = 0;
  sum = 0;
  for (i = 1; i < 31; i++) {
    num = randRange(1, 9, 1);
    document.getElementById('d' + i).style.backgroundColor = "white"
    document.getElementById('d' + i).style.color = "#961035"
    document.getElementById('d' + i).innerText = num
    document.getElementById('d' + i).num = num
  }
}

nextQuestion = function () {
  clearInterval(gNxTimer);
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};