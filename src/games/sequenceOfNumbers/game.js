const sound = new Audio('./sound.mp3');

let rInd, qArr
let qMode

let tAnsArr = new Array()
let ansArr = new Array()

function divClick(inID) {

  document.getElementById(inID.id).style.color = "white"
  if (inID.innerHTML == tAnsArr[ansArr.length]) {
    ansArr.push(parseInt(inID))
    document.getElementById(inID.id).style.backgroundColor = "green"
  } else {
    document.getElementById(inID.id).style.backgroundColor = "red"
    document.getElementById(inID.id).style.backgroundColor = "red"
    setScore(-1)
    setTimeout(nextQuestion, gData.answerDelay);
  }
  if (ansArr.length == tAnsArr.length) {
    setScore(1)
    setTimeout(nextQuestion, gData.answerDelay);
  }
}


fQuestion = function () {
  let miN = gData.gameDef[window.gameCurLevel].minNum
  let mxN = gData.gameDef[window.gameCurLevel].maxNum
  let spN = gData.gameDef[window.gameCurLevel].numStep

  ansArr.length = 0
  tAnsArr.length = 0

  srArr = arrCreateSeries(miN, mxN, spN);
  qArr = arrRandomSelect(srArr, gData.gameDef[window.gameCurLevel].numCount);
  qArr.map((id, index) => {
    document.getElementById("d" + index).style.color = "#961035"
    document.getElementById("d" + index).style.backgroundColor = "white"
    document.getElementById("d" + index).innerHTML = id
    document.getElementById("d" + index).selected = false
    tAnsArr.push(id)
  })

  switch (gData.gameDef[window.gameCurLevel].sortType) {
    case "u":
      rSort = false
      break;
    case "d":
      rSort = true
      break;
    case "r":
      rSort = Math.random() < 0.5;
      break;
  }

  console.info(rSort)
  if (rSort) {
    tAnsArr.sort((a, b) => b - a)
    document.getElementsByClassName("gameHeader")[0].innerHTML = "از بالا به پایین"
  } else {
    tAnsArr.sort((a, b) => a - b)
    document.getElementsByClassName("gameHeader")[0].innerHTML = "از پایین به بالا"
  }

  console.info(tAnsArr)
  qMode = true;
}

function nextQuestion() {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};