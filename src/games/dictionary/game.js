let wordSource = new Array()
let tempArr = new Array()
let qArr = new Array()
let qMode = false

const sound = new Audio('./sound.mp3');


ansCheck = function (inNum) {
  if (qMode) {
    qMode = false
    if (inNum == tInd) {
      setScore(1)
    } else {
      document.getElementsByClassName('optBox')[inNum].classList.add('bg-danger');
      setScore(-1)
    }
    document.getElementsByClassName('optBox')[tInd].classList.add('bg-success');
    setTimeout(() => {
      document.getElementsByClassName('optBox')[inNum].classList.remove('bg-danger');
      document.getElementsByClassName('optBox')[tInd].classList.remove('bg-success');
      nextQuestion()
    }, gData.answerDelay);
  }
};

gFunc = () => {
  qMode = true
  tempArr.length = 0
  qArr.length = 0
  switch (randRange(0, 1, 1)) {
    case 0:
      q = wordSource[(qCount - 1) * 3][0]
      tempArr.push(wordSource[(qCount - 1) * 3][1])
      break;
    case 1:
      q = wordSource[(qCount - 1) * 3][1]
      tempArr.push(wordSource[(qCount - 1) * 3][0])
      break;
  }
  for (let index = 1; index < 4; index++) {
    tempArr.push(wordSource[((qCount - 1) * 3) + index][randRange(0, 1, 1)])
  }
  qArr = arrRandomSelect(tempArr, 4)
  tInd = valInArrIndArr(qArr, tempArr[0])
  document.getElementsByClassName('qBox')[0].innerHTML = 'معنی کلمه ' + q + ' کدام گزینه میباشد ؟'
  qArr.map((val, index) => document.getElementsByClassName('optBox')[index].innerHTML = val)
  console.info(tInd)
}

fQuestion = function () {
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = arrRandomSelect(json, gData.gameDef[window.gameCurLevel].qMax * 3)
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