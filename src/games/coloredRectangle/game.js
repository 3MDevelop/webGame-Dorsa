const sound = new Audio('./sound.mp3');
let areaWidth, areaHeight, scoreAdd
let qMode
let selItemInd = new Array()
let colorArr = new Array()
let divArr = new Array()

setScoreBosPos = () => {
  boxTel = 5
  boxWidth = document.getElementById('d' + selItemInd[1]).offsetLeft - document.getElementById('d' + selItemInd[0]).offsetLeft + document.getElementById('d' + selItemInd[1]).offsetWidth + (2 * boxTel)
  boxHeight = document.getElementById('d' + selItemInd[2]).offsetTop - document.getElementById('d' + selItemInd[0]).offsetTop + document.getElementById('d' + selItemInd[2]).offsetHeight + (2 * boxTel)

  document.getElementById('scoreBox').style.display = 'flex'


  document.getElementById('scoreBox').style.left = (document.getElementById('d' + selItemInd[0]).offsetLeft - boxTel) + "px";
  document.getElementById('scoreBox').style.top = (document.getElementById('d' + selItemInd[0]).offsetTop - boxTel) + "px";
  document.getElementById('scoreBox').style.width = boxWidth + "px";
  document.getElementById('scoreBox').style.height = boxHeight + "px";


  document.getElementById('scoreBox').innerText = scoreAdd
}


selectedIsRect = () => {
  x0 = Math.floor((selItemInd[0]) / 7)
  x1 = Math.floor((selItemInd[1]) / 7)
  x2 = Math.floor((selItemInd[2]) / 7)
  x3 = Math.floor((selItemInd[3]) / 7)
  y0 = (selItemInd[0]) % 7
  y1 = (selItemInd[1]) % 7
  y2 = (selItemInd[2]) % 7
  y3 = (selItemInd[3]) % 7
  if (x0 == x1 && x2 == x3 && y0 == y2 && y1 == y3) {
    areaHeight = x2 - x1 + 1
    areaWidth = y1 - y0 + 1
    scoreAdd = areaWidth * areaHeight
    return true
  }
}

isColorSame = () => {
  if (divArr[selItemInd[0]] == divArr[selItemInd[1]] &&
    divArr[selItemInd[0]] == divArr[selItemInd[2]] &&
    divArr[selItemInd[0]] == divArr[selItemInd[3]]) {
    return true
  }
}


ansCheck = () => {
  qMode = false
  selItemInd.sort(function (a, b) { return a - b; })
  if (selectedIsRect() && isColorSame()) {
    setScoreBosPos()
    setScore(scoreAdd)
  } else {
    setScore(-1)
  }
  timeOut = setTimeout(nextQuestion, gData.answerDelay)
}



divClick = (inID) => {
  if (qMode) {
    if (valInArrIndArr(selItemInd, inID) == -1) {
      document.getElementById('d' + inID).style.border = "solid " + gData.borderThickness + "px " + gData.borderColor
      selItemInd.push(inID)
    } else {
      document.getElementById('d' + inID).style.border = ""
      selItemInd.splice(valInArrIndArr(selItemInd, inID), 1);
    }
    if (selItemInd.length == 4) {

      ansCheck()
    }
  }
}

fQuestion = function () {
  document.getElementById('scoreBox').style.display = "none"
  qMode = true;
  selItemInd.length = 0;
  colorArr.length = 0;
  divArr.length = 0
  colorArr = arrRandomSelect(gData.colorsRef, gData.gameDef[window.gameCurLevel].colorMax);
  for (i = 0; i < 63; i++) {
    num = randRange(0, gData.gameDef[window.gameCurLevel].colorMax - 1, 1);
    divArr.push(num)
    document.getElementById('d' + i).style.backgroundColor = colorArr[num]
    document.getElementById('d' + i).style.border = ""
  }
}

nextQuestion = function () {
  clearTimeout(timeOut)
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};