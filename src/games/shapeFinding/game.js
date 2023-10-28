
const sound = new Audio('./sound.mp3');
let qMode
let wordSource = new Array()
let qArr = new Array()
let cellCount, ansID

selectBox = function (inID) {
  if(qMode){
    qMode = false
    if (inID == ansID) {
      document.getElementById('bc' + inID).classList.add("trueBoarder")
      setScore(1)
    } else {
      document.getElementById('bc' + inID).classList.add("falseBoarder")
      document.getElementById('bc' + ansID).classList.add("trueBoarder")
      setScore(-1)
    }
  
    setTimeout(() => {
      document.getElementById('bc' + inID).classList.remove("trueBoarder")
      document.getElementById('bc' + inID).classList.remove("falseBoarder")
      document.getElementById('bc' + ansID).classList.remove("trueBoarder")
      nextQuestion()
    }, gData.answerDelay)
  }
}

gFunc = function () {
  qMode = true
  qArr = arrRandomSelect(wordSource, cellCount)
  ansID = randRange(0, cellCount - 1, 1)
  console.info(ansID)
  document.getElementById('Monitor').innerHTML = qArr[ansID]
  qArr.map((img, index) => {
    document.getElementById('d' + index).style.backgroundImage = 'url(./img/' + gData.gameDef[window.gameCurLevel].wordGroup + '/' + stringCharRep(img, " ", "%20") + '.webp)';
  })
}

fQuestion = function () {
  fetch("wordList.json")
    .then(response => response.json())
    .then(json => {
      wordSource = json[gData.gameDef[window.gameCurLevel].wordGroup - 1]
      cellCount = gData.gameDef[window.gameCurLevel].cellXCount * gData.gameDef[window.gameCurLevel].cellYCount
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
