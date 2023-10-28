


const sound = new Audio('./sound.mp3');
let qMode = false
let chArr = new Array()
let ansSt
let setSpaceBefore = false
let wordSource = new Array()

document.addEventListener('keydown', function (event) {
  event.preventDefault();
  let m = event.key;
  if (qMode) {
    if (m === "Enter") {
      num('a');
    } else if (m === "Backspace" || m === "Delete") {
      num('d');
    } else if (m == " ") {
      num('sp');
    } else {

      if (faCharRef.indexOf(event.key) > -1) {
        num(event.key)
      }
    }
  }
});

num = (inNum) => {
  if (qMode) {
    switch (inNum) {
      case 'sp':
        setSpaceBefore = true
        break;
      case 'd':
        st = document.getElementById('Monitor').innerText
        document.getElementById('Monitor').innerText = st.substring(0, st.length - 1)
        break;
      case 'a':
        qMode = false
        if (document.getElementById('Monitor').innerText == ansSt) {
          setScore(1)
          document.getElementById('Monitor').classList.add('text-success')
        } else {
          document.getElementById('Monitor').classList.add('text-danger')
          document.getElementById('Monitor').innerText = ansSt
          setScore(-1)
        }
        timeOut = setTimeout(nextQuestion, gData.answerDelay);
        break;
      case 0:
        break;
      default:
        if (document.getElementById('Monitor').innerText.length < 15) {
          document.getElementById('Monitor').innerText +=
            (setSpaceBefore ? ' ' : '') + inNum;
          setSpaceBefore = false;
        }
        break;
    }
  }
}

function showBoard() {
  document.getElementById('soundBox').classList.add('d-none')
  document.getElementById('keyContainer').classList.remove('d-none')
}

function showSound() {
  document.getElementById('Monitor').innerText = ""
  document.getElementById('Monitor').classList.remove('text-success')
  document.getElementById('Monitor').classList.remove('text-danger')
  document.getElementById('soundBox').classList.remove('d-none')
  document.getElementById('keyContainer').classList.add('d-none')
}

gFunc = function () {
  showSound()
  ansSt = wordSource[qCount - 1][0]
  ansSound = wordSource[qCount - 1][1]
  const wordSound = new Audio("./sounds/" + gData.gameDef[window.gameCurLevel].wordGroup + "/" + ansSound + ".mp3");
  wordSound.addEventListener('ended', function () {
    qMode = true
    setTimeout(showBoard, 100);
  });
  wordSound.play()
}


fQuestion = function () {
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = arrRandomSelect(json[gData.gameDef[window.gameCurLevel].wordGroup - 1], gData.gameDef[window.gameCurLevel].qMax);
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


