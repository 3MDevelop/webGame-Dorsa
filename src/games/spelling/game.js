let wordSource = new Array()
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
  tAns = wordSource[qCount - 1][0]
  qArr = arrRandomSelect(wordSource[qCount - 1], 4)
  tInd = valInArrIndArr(qArr, tAns)
  console.info(tInd)
  qArr.map((val, index) => document.getElementsByClassName('optBox')[index].innerHTML = val)
}

fQuestion = function () {
  document.getElementsByClassName('qBox')[0].innerHTML = 'املای کدام گزینه صحیح است؟'
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = arrRandomSelect(json, gData.gameDef[window.gameCurLevel].qMax)
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