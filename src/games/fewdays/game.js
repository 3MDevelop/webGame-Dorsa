
const sound = new Audio("./sound.mp3");

let stPos, sum, tAns
let sign = true
let nxStep = 100
let qMode
let selectedW, selectedD, selectedM

function boxSelect(target) {
  console.info(target)
  let m = eval("selected" + target.boxCat)
  console.info("m = " + m)
}


function ansCheck() {
  qMode = false
  if (document.getElementsByClassName('Monitor')[0].innerText == tAns) {
    document.getElementsByClassName('Monitor')[0].style.color = "green"
    setScore(1)
  } else {
    document.getElementsByClassName('Monitor')[0].innerHTML = tAns
    document.getElementsByClassName('Monitor')[0].style.color = "red"
    setScore(-1)
  }
  setTimeout(nextQuestion, gData.answerDelay);
}

function num(inNum) {
  if (!qMode) {
    if (inNum == 'n') {
      sign = !sign;
    } else if (inNum == 'd') {
      sign = true;
      sum = 0;
    } else if (inNum != 'a') {
      if (sum < 10000000) {
        inNum = Math.round(inNum);
        sum = (sum * 10) + inNum;
      }
    }
    if (sum == 0) {
      document.getElementsByClassName('Monitor')[0].innerText = '';
    } else if (sign) {
      document.getElementsByClassName('Monitor')[0].innerText = sum;
    } else {
      document.getElementsByClassName('Monitor')[0].innerText = -1 * sum;
    }
    if (inNum == 'a') {
      console.info('test')
      ansCheck(document.getElementsByClassName('Monitor')[0].innerText);
    }
  }
}

function hideFunc() {
  /* clearInterval(gNxTimer); */
  document.getElementsByClassName('d1')[0].style.display = "none";
  document.getElementsByClassName('d2')[0].style.display = "flex";
  qMode = false
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
  gNxTimer = setInterval(nextTimerFunc, gData.gameDef[gameCurLevel].qDelay / 100);
}


function fQuestion() {
  let selectedW = undefined
  let selectedD = undefined
  let selectedM = undefined
  countDay = randRange(gData.gameDef[gameCurLevel].minDayCount, gData.gameDef[gameCurLevel].maxDayCount, 1)

  switch (gData.gameDef[gameCurLevel].qType) {
    case 1:
      st = randRange(1, 7, 1)
      qDay = persianCalendare(st, 1)
      aDay = persianCalendare(countDay, st)
      document.getElementById('qPlace').innerHTML = "امروز " + qDay.weekday + " است. " + countDay + " روز بعد چه روزیست ؟"
      console.info(aDay)
      break;
    case 2:
      console.info('typ1 2')
      break;
    case 3:
      console.info('typ1 3')
      break;

    default:
      break;
  }



  /*   document.getElementsByClassName('Monitor')[0].style.color = "black"
    document.getElementsByClassName('Monitor')[0].innerHTML = ""
    document.getElementsByClassName('d1')[0].style.display = "flex";
    document.getElementsByClassName('d2')[0].style.display = "none";
    sum = 0
    qMode = true;
    ans = 0;
    sourceDay = randRange(0, 6, 1);
    day1 = randRange(gData.gameDef[gameCurLevel].fDayDown, gData.gameDef[gameCurLevel].fDayUp, 1);
    day2 = randRange(day1 + gData.gameDef[gameCurLevel].minDays, day1 + gData.gameDef[gameCurLevel].maxDays, 1);
    date1 = numToDate(day1, sourceDay);
    date2 = numToDate(day2, sourceDay);
    stPosInd = date1[4];
    stPos = date1[3];
    qDayInd = randRange(0, 6, 1);
    qDay = numToDay(qDayInd);
    count = 0;
    for (i = day1; i < day2 + 1; i++) {
      if (stPosInd == qDayInd) {
        count++;
      }
      stPosInd++;
      if (stPosInd == 7) {
        stPosInd = 0;
      }
    }
    tAns = count;
    document.getElementsByClassName('quest')[0].innerHTML = "بین دو تاریخ زیر چند " + qDay + " وجود دارد ؟"
    document.getElementsByClassName('day')[0].innerHTML = date1[0] + " " + date1[1]
    document.getElementsByClassName('date')[0].innerHTML = date1[3]
    document.getElementsByClassName('day')[1].innerHTML = date2[0] + " " + date2[1]
    console.log(date1)
    console.log(date2)
    console.log(qDay)
    console.log(tAns);
    console.log('-----------------')
    /* nxTimer() */

};

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};

document.addEventListener('keydown', function (event) {
  event.preventDefault();
  let m = event.key;
  if (!qMode) {
    if (m == "Enter") {
      num('a')
    } else if (m == "-") {
      /*  num('n') */
    } else if (m == "Backspace" || m == "Delete") {
      num('d')
    } else if (m > -1 && m < 10) {
      num(m)
    }
  } else {
    if (m == "Enter") {
      hideFunc()
    }
  }
});