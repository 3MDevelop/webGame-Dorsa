
const sound = new Audio('./sound.mp3');
let qMode = false
let wordSource = new Array()
let qArr = new Array()
let ansArr = new Array()
let qYIndArr = new Array()
let cellCount, ansID, counter, lastItem

resetBox = (inVal) => {
  if (!inVal) {
    ansArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'white'
      document.getElementById('d' + inID).classList = ['boxBack']
    })
  } else {
  }
  qArr.map((inID) => {
    document.getElementById('bc' + inID).style.backgroundColor = 'white'
    document.getElementById('d' + inID).classList = ['boxBack']
  })
  nextQuestion()
}


ansCheck = () => {
  inID = ansArr.length - 1
  if (ansArr[inID] != qArr[inID]) {
    ansArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'rgb(249, 93, 93)'
    })
    qArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'rgb(61, 234, 61)'
      document.getElementById('d' + inID).classList = ['MeshBox']
    })
    setTimeout(resetBox, gData.answerDelay, false)
    setScore(-1)
    qMode = false
  } else if (ansArr.length == qArr.length) {
    qArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'rgb(61, 234, 61)'
    })
    setTimeout(resetBox, gData.answerDelay, true)
    setScore(1)
    qMode = false
  }
  if(qYIndArr.indexOf(ansArr[ansArr.length-1])>-1){
    document.getElementsByClassName('columnSeperator')[qYIndArr.indexOf(ansArr[ansArr.length-1])].style.backgroundColor = 'rgb(61, 234, 61)'
  }
}

selectBox = function (inID) {
  if (qMode) {
    element = document.getElementById('d' + inID)
    element.classList = ['MeshBox']
    document.getElementById('bc' + inID).style.backgroundColor = '#e4e4e4'
    ansArr.push(inID)
    ansCheck()
  }
}

showQ = () => {
  if (counter < qArr.length) {
    document.getElementById('d' + qArr[counter]).classList = ['MeshBox']
    if (counter > 0) {
      document.getElementById('d' + qArr[counter - 1]).classList = ['boxBack']
    }
    counter++
  } else {
    document.getElementById('d' + qArr[counter - 1]).classList = ['boxBack']
    clearInterval(timeInterval)
    document.getElementById('BackGround').classList.remove('bg-warning')
    qMode = true
  }
}

fQuestion = function () {

  ansArr.length = 0
  cellCount = gData.gameDef[window.gameCurLevel].cellXCount * gData.gameDef[window.gameCurLevel].cellYCount
  qArr.length = 0
  qArr.push(randRange(0, gData.gameDef[window.gameCurLevel].cellYCount - 1, 1))

  while (qArr[qArr.length - 1] < cellCount - gData.gameDef[window.gameCurLevel].cellYCount) {
    lastItem = qArr[qArr.length - 1]
    let posibleMove = new Array()
    if (lastItem % gData.gameDef[window.gameCurLevel].cellYCount > 0) {
      posibleMove.push(lastItem - 1)
      posibleMove.push(lastItem - 1 + gData.gameDef[window.gameCurLevel].cellYCount)
    }
    if (lastItem % gData.gameDef[window.gameCurLevel].cellYCount < gData.gameDef[window.gameCurLevel].cellYCount - 1) {
      posibleMove.push(lastItem + 1)
      posibleMove.push(lastItem + 1 + gData.gameDef[window.gameCurLevel].cellYCount)
    }
    posibleMove.push(lastItem + gData.gameDef[window.gameCurLevel].cellYCount)
    newMove = posibleMove[randRange(0, posibleMove.length - 1, 1)]
    if (!isValInArr(qArr, newMove)) {
      qArr.push(newMove)
    }
  }
  document.getElementById('BackGround').classList.add('bg-warning')
  counter = 0
  console.info(qArr)
  qYIndArr.length = 0
  ind = 0
  qArr.map((inID,index) => {
    if ((Math.floor(inID / gData.gameDef[window.gameCurLevel].cellYCount) + 1) > gData.gameDef[window.gameCurLevel].xStepLimit[ind]) {
      qYIndArr.push(inID)
      ind++
    }
  })
  console.info(qYIndArr)
  timeInterval = setInterval(showQ, gData.gameDef[window.gameCurLevel].boxDelay)
}

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};
