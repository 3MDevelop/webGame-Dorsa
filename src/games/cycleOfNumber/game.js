const sound = new Audio('./sound.mp3');
let qMode

let shArr = new Array();
let qArr = new Array()
let qInd, ansInd, qVal, ansVal

ansCheck = function (inNum) {
  if (inNum == ansInd) {
    document.getElementById('a' + (inNum + 1)).style.backgroundColor = 'green'
    setScore(1);
  }
  else {
    document.getElementById('a' + (inNum + 1)).style.backgroundColor = 'red'
    document.getElementById('a' + (ansInd + 1)).style.backgroundColor = 'green'
    setScore(-1);
  }
  setTimeout(nextQuestion, gData.answerDelay);
};

showOption = function () {
  document.getElementsByClassName('QMark')[0].innerText = ''
  document.getElementsByClassName('Keyboard')[0].style.visibility = 'visible'
  for (i = 1; i < gData.gameDef[gameCurLevel].cellCount+1; i++) {
    if (i != (qInd + 1)) {
      document.getElementById('q' + i).innerText = ''
      document.getElementById('m' + i).style.backgroundColor = 'whitesmoke'
    }
  }
  for (i = 1; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    document.getElementById('a' + i).style.backgroundColor = 'whitesmoke'
    document.getElementById('a' + i).innerText = qArr[i - 1][0]
  }
};


fQuestion = function () {
  document.getElementsByClassName('Keyboard')[0].style.visibility = 'hidden'
  document.getElementsByClassName('QMark')[0].innerText = '؟'

  shArr.length = 0;
  qArr.length = 0;
  colorArr = arrRandomSelect(gData.colorsRef, gData.gameDef[gameCurLevel].cellCount/2);
  numArr = arrRandomSelect(arrCreateSeries(gData.gameDef[window.gameCurLevel].minVal, gData.gameDef[window.gameCurLevel].maxVal, 1), gData.gameDef[gameCurLevel].cellCount);
  for (let index = 0; index < gData.gameDef[gameCurLevel].cellCount / 2; index++) {
   colorArr.push(colorArr[index])
 }
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount; i++) {
    shArr.push([numArr[i], colorArr[i]])
    document.getElementById('q' + (i + 1)).innerText = numArr[i]
    document.getElementById('m' + (i + 1)).style.backgroundColor = colorArr[i]
  };
  qInd = randRange(0, gData.gameDef[gameCurLevel].cellCount-1, 1)
  qVal = shArr[qInd][0]
  qColor = shArr[qInd][1]
  if (qInd < gData.gameDef[gameCurLevel].cellCount/2) {
    ansVal = shArr[qInd + gData.gameDef[gameCurLevel].cellCount/2][0]
  } else {
    ansVal = shArr[qInd - gData.gameDef[gameCurLevel].cellCount/2][0]
  }
  for (i = 0; i < shArr.length; i++) {
    if (i != qInd) {
      qArr.push(shArr[i])
    }
  }
  qArr = arrRandomSelect(qArr, gData.gameDef[gameCurLevel].cellCount-1);
  for (i = 0; i < gData.gameDef[gameCurLevel].cellCount-1; i++){
    if (ansVal == qArr[i][0]) {
      ansInd = i
    }
  }
  console.log('qVal = ' + qVal)
  console.log('ansVal = ' + ansVal)
}

nextQuestion = function () {
  ///clearTimeout(timeOut)
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};