
const sound = new Audio('./sound.mp3');
let qMode
let qArr = new Array()
let wordArr1 = new Array()
let wordArr2 = new Array()
let chArr = new Array()
let ansSt
let setSpaceBefore = false
let wordSource = new Array()

let charArr = "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی آ"


document.addEventListener('keydown', function (event) {
  event.preventDefault();
  let m = event.key;
  if (!qMode) {
    if (m === "Enter") {
      num('a');
    } else if (m === "Backspace" || m === "Delete") {
      num('d');
    } else if (m == " ") {
      num('sp');
    } else {

      if (charArr.indexOf(event.key) > -1) {
        num(event.key)
      }
    }
  }
});

keyFunc = function (key) {
  return key
}

answerFunc = () => {
  qMode = false
  document.getElementById('Keyboard').style.visibility = 'visible';
  document.getElementById('Monitor').classList.remove("monitorText")
  document.getElementById('Monitor').classList.add("monitorNum");
  document.getElementById('Monitor').innerText = ''
}

num = (inNum) => {
  if (!qMode) {
    switch (inNum) {
      case 'sp':
        setSpaceBefore = true
        break;
      case 'd':
        st = document.getElementById('Monitor').innerText
        document.getElementById('Monitor').innerText = st.substring(0, st.length - 1)
        break;
      case 'a':
        qMode = true
        if (document.getElementById('Monitor').innerText == ansSt) {
          setScore(1)
          document.getElementById('Monitor').style.color = "green"
        } else {
          document.getElementById('Monitor').style.color = "red"
          document.getElementById('Monitor').innerText = ansSt
          setScore(-1)
        }
        timeOut = setTimeout(nextQuestion, gData.answerDelay);
        break;
      case 0:
        break;
      default:
        if (document.getElementById('Monitor').innerText.length < 25) {
          document.getElementById('Monitor').innerText +=
            (setSpaceBefore ? ' ' : '') + inNum;
          setSpaceBefore = false;
        }
        break;
    }
  }
}

gFunc = function () {
  qMode = true
  if (qCount == 1) {
    qArr = arrRandomSelect(wordSource, (gData.gameDef[window.gameCurLevel].qMax))
  }
  ansSt = qArr[qCount - 1]
  console.info(ansSt);
  document.getElementById('Keyboard').style.visibility = 'hidden';
  document.getElementById('Monitor').classList.remove("monitorNum");
  document.getElementById('Monitor').classList.add("monitorText");
  document.getElementById('Monitor').style.color = "black"
  document.getElementById('Monitor').innerText = ansSt
  timeOut = setTimeout(answerFunc, gData.gameDef[window.gameCurLevel].questionTime);
}


fQuestion = function () {

  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = json["wordGroup" + gData.gameDef[window.gameCurLevel].wordGroup];
      gFunc()
    });
}

nextQuestion = function () {
  clearTimeout(timeOut)
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc();
  } else {
    gFunc();
  }
};


