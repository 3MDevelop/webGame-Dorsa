
const sound = new Audio('./sound.mp3');
let qMode = false
let wordSource = new Array()
let qArr = new Array()
let ansArr = new Array()
let limArr = new Array()
let sepInd = new Array()
let cellCount, ansID, lastItem, uErrCount, limitPass

resetBox = (inVal) => {
  if (inVal) {
    setScore(1)
  } else {
    setScore(-1)
  }

  qArr.map((inID) => {
    document.getElementById('bc' + inID).style.backgroundColor = 'white'
    document.getElementById('d' + inID).classList = ['bg-success']
  })
  setTimeout(() => {
    qArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'white'
      document.getElementById('d' + inID).classList = ['boxBack']
    })
    gData.gameDef[window.gameCurLevel].xStepLimit.map((val, index) => {
      document.getElementsByClassName('columnSeperator')[index].style.backgroundColor = 'rgb(96, 196, 196, 0.3)'
    })
    nextQuestion()
  }, gData.answerDelay)

}
/*  qArr.map((inID) => {
   document.getElementById('bc' + inID).style.backgroundColor = 'white'
   document.getElementById('d' + inID).classList = ['boxBack']
 })
}
document.getElementById('bc' + inID).style.backgroundColor = 'rgb(249, 93, 93)'
document.getElementById('bc' + inID).style.backgroundColor = 'rgb(61, 234, 61)'
*/



ansCheck = () => {
  if (ansArr[ansArr.length - 1] == qArr[[ansArr.length - 1]]) { /* step step check */
    console.info('step pass')
    for (let index = 0; index < limArr.length; index++) {
      if (ansArr[ansArr.length - 1] >= limArr[index] && limArr.indexOf(limArr[index]) >> 0) {
        limitPass = limArr.indexOf(limArr[index])
        document.getElementsByClassName('columnSeperator')[limitPass - 1].style.backgroundColor = 'rgb(61, 234, 61)'
      }
    }
  } else {
    uErrCount++
    fAlert.play()
    for (let index = 0; index < ansArr.length; index++) {
      if (ansArr[index] >= limArr[limitPass]) {
        ansArr.length = index
        break
      }
    }
    for (let index = limArr[limitPass]; index < cellCount; index++) {
      document.getElementById('d' + index).classList = ['boxBack']
    }
  }

  if (uErrCount == gData.gameDef[window.gameCurLevel].errCount) {
    resetBox(false)
  }

  if (ansArr.length == qArr.length) {
    resetBox(true)
  }



  /* inID = ansArr.length - 1
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
  if (qYIndArr.indexOf(ansArr[ansArr.length - 1]) > -1) {
    document.getElementsByClassName('columnSeperator')[qYIndArr.indexOf(ansArr[ansArr.length - 1])].style.backgroundColor = 'rgb(61, 234, 61)'
  } */



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

fQuestion = function () {
  uErrCount = 0
  ansArr.length = 0
  cellCount = gData.gameDef[window.gameCurLevel].cellXCount * gData.gameDef[window.gameCurLevel].cellYCount
  qArr.length = 0
  qArr.push(randRange(0, gData.gameDef[window.gameCurLevel].cellYCount - 1, 1))

  while (qArr[qArr.length - 1] < cellCount - gData.gameDef[window.gameCurLevel].cellYCount) {
    lastItem = qArr[qArr.length - 1]
    let posibleMove = new Array()
    if (lastItem % gData.gameDef[window.gameCurLevel].cellYCount > 0) {
      posibleMove.push(lastItem - 1)
      /*  posibleMove.push(lastItem - 1 + gData.gameDef[window.gameCurLevel].cellYCount) */
    }
    if (lastItem % gData.gameDef[window.gameCurLevel].cellYCount < gData.gameDef[window.gameCurLevel].cellYCount - 1) {
      posibleMove.push(lastItem + 1)
      /* posibleMove.push(lastItem + 1 + gData.gameDef[window.gameCurLevel].cellYCount) */
    }
    posibleMove.push(lastItem + gData.gameDef[window.gameCurLevel].cellYCount)
    newMove = posibleMove[randRange(0, posibleMove.length - 1, 1)]
    if (!isValInArr(qArr, newMove)) {
      qArr.push(newMove)
    }
  }

  document.getElementById('BackGround').classList.add('bg-warning')

  limArr.length = 0
  limArr = [0]
  gData.gameDef[window.gameCurLevel].xStepLimit.map((val) => {
    limArr.push(val * gData.gameDef[window.gameCurLevel].cellYCount)
  })
  console.info(limArr)
  limitPass = 0
  qArr.map((inID) => {
    document.getElementById('d' + inID).classList = ['MeshBox']
  })
  timeInterval = setInterval(() => {
    qArr.map((val) => {
      document.getElementById('d' + val).classList = ['boxBack']
    })
    document.getElementById('BackGround').classList.remove('bg-warning')
    clearInterval(timeInterval)
    qMode = true
  }, gData.gameDef[window.gameCurLevel].boxDelay)
}

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};
