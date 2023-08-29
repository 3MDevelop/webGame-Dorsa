
const sound = new Audio("./sound.mp3");

let count, numCount, numSum, sum, timeOut
let numArr = new Array();
let aTime = false
let sign = true
let qMode = true

score = 0

ansCheck = function (inNum) {
  if (aTime) {
    aTime = false
    qMode = false;
    if (inNum == numSum) {
      document.getElementsByClassName('text_in')[0].style.color = "green"
      setScore(1)
    } else {
      document.getElementsByClassName('text_in')[0].style.color = "red"
      document.getElementsByClassName('text_in')[0].innerText = numSum
      setScore(-1)
    }
    timeOut = setTimeout(nextQuestion, gData.answerDelay);
  }
};
function num(inNum) {

  if (inNum == 'n') {
    sign = !sign;
  } else if (inNum == 'd') {
    sign = true;
    sum = 0;
  } else if (inNum != 'a') {
    if (sum < 1000) {
      inNum = Math.round(inNum);
      sum = (sum * 10) + inNum;
    }
  }
  if (aTime) {
    if (sum == 0) {
      document.getElementsByClassName('text_in')[0].innerText = '0';
    } else if (sign) {
      document.getElementsByClassName('text_in')[0].innerText = sum;
    } else {
      document.getElementsByClassName('text_in')[0].innerText = -1 * sum;
    }
  }
  if (inNum == 'a') {
    if (aTime) {
      ansCheck(document.getElementsByClassName('text_in')[0].innerText);
    }
  }
}


showFunc = function () {
  document.getElementsByClassName('text_in')[0].innerText = numArr[count - 1];
  timeOut = setTimeout(offFunc, gData.gameDef[window.gameCurLevel].showDelay);
};
offFunc = function () {
  if (count < numArr.length) {
    count++;
    document.getElementsByClassName('text_in')[0].innerText = "";
    timeOut = setTimeout(showFunc, gData.gameDef[window.gameCurLevel].offDelay);
  } else {
    timeOut = setTimeout(endFunc, gData.gameDef[window.gameCurLevel].showDelay);
  }
};
endFunc = function () {
  document.getElementsByClassName('text_in')[0].innerText = '';
  document.getElementById('Keyboard').style.visibility = 'visible';
  qMode = false;
  aTime = true;
};

function fQuestion() {
  aTime = false
  qMode = true
  sign = true
  document.getElementsByClassName('text_in')[0].style.color = 'black'
  document.getElementById('Keyboard').style.visibility = 'hidden'
  aTime = false
  sum = 0
  numCount = randRange(gData.gameDef[window.gameCurLevel].minCount, gData.gameDef[window.gameCurLevel].maxCount, 1);
  numSum = 0;
  numArr.length = 0;
  for (i = 0; i < numCount; i++) {
    numArr[i] = randRange(gData.gameDef[window.gameCurLevel].minVal, gData.gameDef[window.gameCurLevel].maxVal, 1);
    numSum = numSum + numArr[i];
  }
  console.info(numSum)
  document.getElementsByClassName('text_in')[0].innerText = '';
  count = 1;
  timeOut = setTimeout(showFunc, gData.startDelay);
};

nextQuestion = function () {
  clearTimeout(timeOut)
  document.getElementsByClassName('text_in')[0].innerText = '';
  document.getElementById('Keyboard').style.visibility = 'hidden'
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};

function pauseGame() {
  clearTimeout(timeOut)
}

document.addEventListener('keydown', function (event) {
  event.preventDefault();
  let m = event.key;
  if (!qMode && aTime) {
    if (m == "Enter") {
      num('a')
    } else if (m == "-") {
      num('n')
    } else if (m == "Backspace" || m == "Delete") {
      num('d')
    } else if (m > -1 && m < 10) {
      num(m)
    }
  }
});


