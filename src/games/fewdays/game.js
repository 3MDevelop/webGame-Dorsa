
const sound = new Audio("./sound.mp3");

let stPos, sum, tAns
let sign = true
let nxStep = 100
let qMode
const selectedValues = {
  W: undefined,
  D: undefined,
  M: undefined
};
let tAnsArr = new Array()
let ansArr = new Array()


function boxSelect(target) {
  if (qMode) {
    const catKey = target.boxCat;
    if (!selectedValues[catKey]) {
      document.getElementById(target.id).classList.add('bg-info');
      selectedValues[catKey] = target.id;
    } else if (selectedValues[catKey] === target.id) {
      document.getElementById(target.id).classList.remove('bg-info');
      selectedValues[catKey] = undefined;
    } else {
      document.getElementById(selectedValues[catKey]).classList.remove('bg-info');
      document.getElementById(target.id).classList.add('bg-info');
      selectedValues[catKey] = target.id;
    }

    switch (target.boxCat) {
      case "W":
        ansArr[0] = (selectedValues[catKey] != undefined) ? target.id : undefined
        break;
      case "D":
        ansArr[1] = (selectedValues[catKey] != undefined) ? target.id : undefined
        break;
      case "M":
        ansArr[2] = (selectedValues[catKey] != undefined) ? target.id : undefined
        break;
    }

    if (!isValInArr(ansArr, undefined)) {
      qMode = false
      if (arrAreEqual(ansArr, tAnsArr)) {
        setScore(1)
      } else {
        setScore(-1)
      }
      showAns()
      setTimeout(nextQuestion, gData.answerDelay);
    }
  }
}

function showAns() {

  ansArr.map((val) => {
    if (val != -1) {
      document.getElementById(val).classList.remove('bg-info');
      document.getElementById(val).classList.add('bg-danger');
    }
  })

  tAnsArr.map((tVal) => {
    if (tVal != -1) {
      document.getElementById(tVal).classList.remove('bg-info');
      document.getElementById(tVal).classList.remove('bg-danger');
      document.getElementById(tVal).classList.add('bg-success');
    }
  })

}

function clearBox() {
  ansArr.map((val) => {
    if (val != -1) {
      document.getElementById(val).classList.remove('bg-info');
      document.getElementById(val).classList.remove('bg-danger');
      document.getElementById(val).classList.remove('bg-success');
    }
  })

  tAnsArr.map((tVal) => {
    if (tVal != -1) {
      document.getElementById(tVal).classList.remove('bg-info');
      document.getElementById(tVal).classList.remove('bg-danger');
      document.getElementById(tVal).classList.remove('bg-success');
    }
  })
  tAnsArr.length = 0
  ansArr.length = 0
}

function fQuestion() {
  clearBox()
  qMode = true
  countDay = randRange(gData.gameDef[gameCurLevel].minDayCount, gData.gameDef[gameCurLevel].maxDayCount, 1)
  switch (gData.gameDef[gameCurLevel].qType) {
    case 1:
      st = randRange(1, 7, 1)
      qDay = persianCalendare(st, 1)
      aDay = persianCalendare(countDay, st)
      document.getElementById('qPlace').innerHTML = "امروز " + qDay.weekday + " است. " + countDay + " روز بعد چه روزیست ؟"
      tAnsArr = ["W" + aDay.weekdayNum, -1, -1]
      ansArr = [undefined, -1, -1]
      break;
    case 2:
      st = randRange(gData.gameDef[gameCurLevel].dLimDay, gData.gameDef[gameCurLevel].uLimDay, 1)
      qDay = persianCalendare(st, 1)
      aDay = persianCalendare(st + countDay, 1)
      document.getElementById('qPlace').innerHTML = "امروز " + qDay.day + " " + qDay.mounth + " است. " + countDay + " روز بعد چه روزیست ؟"
      tAnsArr = [-1, "D" + aDay.day, "M" + aDay.mounthNum]
      ansArr = [-1, undefined, undefined]

      break;
    case 3:
      st1 = randRange(1, 7, 1)
      qDay1 = persianCalendare(st1, 1)
      aDay1 = persianCalendare(countDay, st1)

      st2 = randRange(gData.gameDef[gameCurLevel].dLimDay, gData.gameDef[gameCurLevel].uLimDay, 1)
      qDay2 = persianCalendare(st2, 1)
      aDay2 = persianCalendare(st2 + countDay, 1)

      document.getElementById('qPlace').innerHTML = "امروز " + qDay1.weekday + " " + qDay2.day + " " + qDay2.mounth + " است. " + countDay + " روز بعد چه روزیست ؟"
      tAnsArr = ["W" + aDay1.weekdayNum, "D" + aDay2.day, "M" + aDay2.mounthNum]
      ansArr = [undefined, undefined, undefined]

      break;
  }

  console.info(tAnsArr)
};

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};
