const sound = new Audio('./sound.mp3');

let wordArr = new Array()
let qArr = new Array();
let stArr = new Array();
let tmpArr = new Array();
var trueCount, selectedID, timeOut, cellCount
let ansTime = false

const showPos = (cellNum, pos, inTxt) => {
  let dom = document.getElementById('b' + cellNum)
  switch (pos) {
    case 1: //normMode
      dom.innerText = inTxt
      dom.style.color = 'brown'
      dom.style.border = '0'
      dom.style.backgroundColor = "white"
      dom.style.backgroundImage = 'none';
      break;
    case 2: // selectMode
      dom.innerText = inTxt
      dom.style.color = 'brown'
      dom.style.border = '4px gray solid'
      dom.style.backgroundColor = "white"
      dom.style.backgroundImage = 'none';
      break;
    case 3: //backMode
      dom.innerText = ''
      dom.style.border = '0'
      dom.style.backgroundImage = "url('./img/brain.svg')";
      dom.style.backgroundColor = "white"
      break;
    case 4: //trueMode
      dom.innerText = ''
      dom.style.border = '0'
      dom.style.backgroundColor = "greenyellow"
      break;
    case 5: //falseMode
      dom.innerText = inTxt
      dom.style.color = 'white'
      dom.style.border = '0'
      dom.style.backgroundColor = "red"
      break;
    case 6: //trueMode
      dom.innerText = inTxt
      dom.style.color = 'black'
      dom.style.border = '0'
      dom.style.backgroundColor = "greenyellow"
      break;
  }
  ansTime = true
}

function selectFunc(inID) {
  if (ansTime && stArr[inID][1] > -1) {
    ansTime = false
    if (inID != selectedID) {
      showPos(inID, 2, stArr[inID][0])
      if (selectedID > -1 && stArr[inID][1] == stArr[selectedID][1]) {
        showPos(inID, 6, stArr[inID][0])
        showPos(selectedID, 6, stArr[selectedID][0])
        ansTime = false
        timeOut = setTimeout(() => {
          showPos(inID, 4)
          showPos(selectedID, 4)
          stArr[inID][1] = -1
          stArr[selectedID][1] = -1
          selectedID = -2
        }, gData.answerDelay);
        setScore(1)
        trueCount++
      } else if (selectedID > -1 && stArr[inID][1] != stArr[selectedID][1]) {
        showPos(inID, 5, stArr[inID][0])
        showPos(selectedID, 5, stArr[selectedID][0])
        ansTime = false
        timeOut = setTimeout(() => {
          if (gData.gameDef[window.gameCurLevel].showBack) {
            showPos(inID, 3)
            showPos(selectedID, 3)
          } else {
            showPos(inID, 1, stArr[inID][0])
            showPos(selectedID, 1, stArr[selectedID][0])
          }
          selectedID = -2
        }, gData.answerDelay);
      } else {
        selectedID = inID
      }
    } else {
      selectedID = -2
      if (gData.gameDef[window.gameCurLevel].showBack) {
        showPos(inID, 3)
      } else {
        showPos(inID, 1, stArr[inID][0])
      }
    }
    if (trueCount == cellCount / 2) {
      timeOut = setTimeout(nextQuestion, gData.answerDelay);
    }
  }
}

function gFunc() {
  trueCount = 0
  selectedID = -2
  ansTime = false;
  tmpArr.length = 0;
  qArr.length = 0;
  stArr.length = 0;
  cellCount = 20
  qArr = arrRandomSelect(wordArr, cellCount / 2);
  for (i = 0; i < cellCount; i++) {
    if (i < cellCount / 2) {
      tmpArr.push([qArr[i][0], i]);
    }
    else {
      tmpArr.push([qArr[i - cellCount / 2][1], i - cellCount / 2]);
    }
  }
  stArr = arrRandomSelect(tmpArr, cellCount);
  for (i = 0; i < cellCount; i++) {
    showPos(i, 1, stArr[i][0])
  }
  console.log(stArr)

  if (gData.gameDef[window.gameCurLevel].showBack) {
    timeOut = setTimeout(() => {
      for (i = 0; i < cellCount; i++) {
        showPos(i, 3)
      }
      ansTime = true
    }, gData.gameDef[window.gameCurLevel].showDelay);
  } else {
    ansTime = true
  }
}

function fQuestion() {
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordArr = json[gData.gameDef[window.gameCurLevel].wordGroup - 1];
      /* wordArr = json; */
      gFunc()
    });
}

const nextQuestion = () => {
  clearTimeout(timeOut);
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
}