let wordSource = new Array()
let qArr = new Array()
let qMode = false

const sound = new Audio('./sound.mp3');


ansCheck = function (inNum) {
  console.info(inNum)
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

setAnsBox = (count) => {
  if (count==3) {
    document.getElementById('optCont').classList.add('flex-column')
  }else{
    document.getElementById('optCont').classList.remove('flex-column')
  }
  for (let index = 0; index < count; index++) {
    var iDiv = document.createElement('div');
    iDiv.className = 'optBox';
    iDiv.onclick = () => ansCheck(index)
    document.getElementById('optCont').appendChild(iDiv);
  }
}

gFunc = () => {
  qMode = true
  tAns = wordSource[qCount - 1][0]
  qArr = arrRandomSelect(wordSource[qCount - 1], wordSource[qCount - 1].length)
  tInd = valInArrIndArr(qArr, tAns)
  console.info(qArr.length)
  qArr.map((val, index) => {
    document.getElementsByClassName('optBox')[index].innerHTML = val
  })
}

fQuestion = function () {
  document.getElementsByClassName('qBox')[0].innerHTML = 'املای کدام گزینه صحیح است؟'
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = arrRandomSelect(json.wordGroups[(gData.gameDef[window.gameCurLevel].qGroup) - 1], gData.gameDef[window.gameCurLevel].qMax)
      setAnsBox(wordSource[0].length)
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