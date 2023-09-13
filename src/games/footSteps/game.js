
const sound = new Audio('./sound.mp3');
let qMode = false
let wordSource = new Array()
let qArr = new Array()
let ansArr = new Array()
let cellCount, ansID, counter

resetBox = (inVal) => {
  if (!inVal) {
    ansArr.map((inID) => {
      console.info(inID)
      document.getElementById('bc' + inID).style.backgroundColor = 'white'
      document.getElementById('d' + inID).classList = ['boxBack']
      document.getElementById('d' + inID).innerHTML = ''
    })
  }else{
  }
  qArr.map((inID) => {
    console.info(inID)
    document.getElementById('bc' + inID).style.backgroundColor = 'white'
    document.getElementById('d' + inID).classList = ['boxBack']
    document.getElementById('d' + inID).innerHTML = ''
  })
  nextQuestion()
}


ansCheck = () => {
  inID = ansArr.length - 1
  if (ansArr[inID] != qArr[inID]) {
    ansArr.map((inID) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'rgb(249, 93, 93)'
    })
    qArr.map((inID, index) => {
      document.getElementById('bc' + inID).style.backgroundColor = 'rgb(61, 234, 61)'
      document.getElementById('d' + inID).classList = ['MeshBox']
      document.getElementById('d' + inID).innerHTML = index + 1
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

let inT

fQuestion = function () {
  cellCount = gData.gameDef[window.gameCurLevel].cellXCount * gData.gameDef[window.gameCurLevel].cellYCount
  ansArr.length = 0
  qArr.length = 0
  qArr = arrRandomSelect(Array.from(Array(cellCount).keys()), gData.gameDef[window.gameCurLevel].footCount)
  console.info(qArr)
  counter = 0
  document.getElementById('BackGround').classList.add('bg-warning')
  timeInterval = setInterval(showQ, gData.gameDef[window.gameCurLevel].footDelay)
}

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};
