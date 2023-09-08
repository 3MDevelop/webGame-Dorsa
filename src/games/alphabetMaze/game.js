
const sound = new Audio('./sound.mp3');
let qMode
let wordSource = new Array()
let tAnsArr = new Array()
let ansArr = new Array()
let boxArr = new Array()
let outArr = new Array()
let ansWord, ansString, cellMax

showAnswer = function (inPos) {
  qMode = false
  if (inPos) {
    for (let index = 0; index < ansArr.length; index++) {
      document.getElementById('d' + ansArr[index]).classList.add('bg-success')
    }
    setScore(1)
    setTimeout(() => {
      nextQuestion()
    }, gData.answerDelay);
  } else {
    setScore(-1)
    for (let index = 0; index < ansArr.length; index++) {
      document.getElementById('d' + ansArr[index]).classList.add('bg-danger')
    }
    count = 0
    const intervalId = setInterval(() => {
      document.getElementById('d' + tAnsArr[count]).classList.remove('bg-danger')
      document.getElementById('d' + tAnsArr[count]).classList.add('bg-success')
      count++
      if (count == tAnsArr.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          nextQuestion()
        }, gData.answerDelay);
      }
    }, gData.showAnswerStep);
  }
}


const contPosArr = (inInd) => {
  outArr.length = 0
  cellMax = gData.gameDef[window.gameCurLevel].cellCount
  if (inInd > Math.sqrt(cellMax) - 1) {
    outArr.push(inInd - Math.sqrt(cellMax))
  }
  if (inInd % Math.sqrt(cellMax) != 0) {
    outArr.push(inInd - 1)
  }
  if (inInd % Math.sqrt(cellMax) != (Math.sqrt(cellMax) - 1)) {
    outArr.push(inInd + 1)
  }
  if (inInd < cellMax - Math.sqrt(cellMax)) {
    outArr.push(inInd + Math.sqrt(cellMax))
  }
  return outArr
}

chConti = (inID) => {
  if (
    isValInArr(contPosArr(inID), ansArr[ansArr.length - 1]) ||
    ansArr.length == 0
  ) {
    return true
  } else return false
}

selectID = (selectSit, inID) => {
  if (selectSit) {
    document.getElementById('d' + inID).classList.add('bg-secondary')
    ansArr.push(inID)
    ansString = ansString + boxArr[inID]
  } else {
    document.getElementById('d' + inID).classList.remove('bg-secondary')
    ansArr.length = ansArr.length - 1
    ansString = ansString.slice(0, -1)
  }
}

selectBox = (inID) => {
  if (inID == ansArr[ansArr.length - 1]) {
    selectID(false, inID)
  } else {
    (chConti(inID) && boxArr[inID] == ansWord[ansString.length]) ? selectID(true, inID) : showAnswer(false)
    if (ansWord.length == ansString.length) showAnswer(true)
  }

}

const findNextPos = (inInd) => {
  outArr.length = 0
  cellMax = gData.gameDef[window.gameCurLevel].cellCount
  if (inInd > Math.sqrt(cellMax) - 1 && boxArr[inInd - Math.sqrt(cellMax)] == undefined) {
    outArr.push(inInd - Math.sqrt(cellMax))
  }
  if (inInd % Math.sqrt(cellMax) != 0 && boxArr[inInd - 1] == undefined) {
    outArr.push(inInd - 1)
  }
  if (inInd % Math.sqrt(cellMax) != (Math.sqrt(cellMax) - 1) && boxArr[inInd + 1] == undefined) {
    outArr.push(inInd + 1)
  }
  if (inInd < cellMax - Math.sqrt(cellMax) && boxArr[inInd + Math.sqrt(cellMax)] == undefined) {
    outArr.push(inInd + Math.sqrt(cellMax))
  }
  if (outArr.length > 0) {
    out = arrRandomSelect(outArr, outArr.length)[randRange(0, outArr.length - 1, 1)]
  } else {
    out = undefined
  }
  return out
}


const showBoxes = () => {
  ansString = ''
  tAnsArr.length = 0
  ansArr.length = 0
  boxArr.length = 0
  tAnsArr.length = ansWord.length
  boxArr.length = gData.gameDef[window.gameCurLevel].cellCount
  tAnsArr.fill(undefined)
  boxArr.fill(undefined)
  tAnsArr[0] = randRange(0, gData.gameDef[window.gameCurLevel].cellCount - 1, 1)
  document.getElementById('d' + tAnsArr[0]).innerHTML = ansWord[0]
  boxArr[tAnsArr[0]] = ansWord[0]
  index = 1
  nextPos = findNextPos(tAnsArr[index - 1])
  for (let index = 1; index < tAnsArr.length; index++) {
    nextPos = findNextPos(tAnsArr[index - 1])
    if (nextPos == undefined) {
      console.info('nock nock !!')
      showBoxes()
    } else {
      tAnsArr[index] = nextPos
      boxArr[nextPos] = ansWord[index]
    }
  }
  let cellArr = Array.from(Array(gData.gameDef[window.gameCurLevel].cellCount).keys())
  cellArr.map((index) => {
    if (boxArr[index] == undefined) {
      boxArr[index] = faCharRef[randRange(0, faCharRef.length - 1, 1)]
    }
    document.getElementById('d' + index).innerHTML = boxArr[index]
    document.getElementById('d' + index).classList.remove('bg-danger')
    document.getElementById('d' + index).classList.remove('bg-success')
    document.getElementById('d' + index).classList.remove('bg-secondary')
  })
  qMode = true
  document.getElementById("Monitor").classList.add("d-none")
  document.getElementById('boxContainer').classList.remove('d-none')
}

gFunc = function () {
  console.info(wordSource[qCount - 1])
  ansWord = wordSource[qCount - 1]
  qMode = false
  document.getElementById("Monitor").innerHTML = ansWord
  document.getElementById("Monitor").classList.remove("d-none")
  document.getElementById('boxContainer').classList.add('d-none')
  ansWord = ansWord.replace(" ", "")
  setTimeout(showBoxes, gData.gameDef[window.gameCurLevel].questionTime)
}

fQuestion = function () {

  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = arrRandomSelect(json[gData.gameDef[window.gameCurLevel].wordGroup], gData.gameDef[window.gameCurLevel].qMax);
      gFunc()
    });
}

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    gFunc();
  }
};
