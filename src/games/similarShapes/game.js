
const sound = new Audio('./sound.mp3');
let qMode
let tInd

loading = (pArr) => {
  for (i = 0; i < pArr.length; i++) {
    document.getElementById('d' + (i + 1)).style.backgroundImage = "url('./img/obj (" + pArr[i] + ").svg')";
  }
  
  timeOut = setTimeout(showOption, gData.gameDef[window.gameCurLevel].questionDelay)
};

num = (inNum) => {
  if (!qMode) {
    qMode = true
    if (inNum == tInd) {
      document.getElementById('op' + tInd).style.backgroundColor = 'green'
      setScore(1)
    } else {
      setScore(-1)
      document.getElementById('op' + tInd).style.backgroundColor = 'green'
      document.getElementById('op' + inNum).style.backgroundColor = 'red'
    }
    timeOut = setTimeout(nextQuestion, gData.answerDelay)
  }
}

showOption = () => {
  qMode = false
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    document.getElementById('op' + (index + 1)).style.backgroundColor = 'white'
    document.getElementById('op' + (index + 1)).innerText = element
  }
  document.getElementById('firstDiv').style.display = 'none';
  document.getElementById('secDiv').style.display = 'flex'
};

fQuestion = () => {
  console.info(gData.gameDef[window.gameCurLevel].cellCount)
  document.getElementById('firstDiv').style.display = 'flex';
  document.getElementById('secDiv').style.display = 'none'

  var pArr = new Array();

  console.log(gData.gameDef[window.gameCurLevel].maxVal)
  arr = arrRandomSelect(arrCreateSeries(gData.gameDef[window.gameCurLevel].minVal, gData.gameDef[window.gameCurLevel].maxVal, 1), 4);
  tAns = arr[0];
  arr = arrRandomSelect(arr, 4);
  tInd = valInArrIndArr(arr, tAns) + 1;
  picArr = arrRandomSelect(arrCreateSeries(1, gData.gameDef[window.gameCurLevel].picMax, 1), tAns);
  count = gData.gameDef[window.gameCurLevel].minPicCount
  for (i = 0; i < count; i++) {
    for (j = 0; j < picArr.length; j++) {
      pArr[(i * picArr.length) + j] = picArr[j];
    }
  }
  for (i = pArr.length; i < gData.gameDef[window.gameCurLevel].cellCount; i++) {
    n = randRange(0, picArr.length - 1, 1);
    pArr[i] = picArr[n];
  }
  pArr = arrRandomSelect(pArr, gData.gameDef[window.gameCurLevel].cellCount);
  setTimeout(loading, 0, pArr);
  console.log(tAns);
}

nextQuestion = function () {
  clearTimeout(timeOut)
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    fQuestion();
  }
};