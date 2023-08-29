
const sound = new Audio("./sound.mp3");

var color = new Array();
var num = new Array();
var shape = new Array();
var answer = new Array();
var qMode


ansCheck = function (inNum) {
  if (qMode) {
    qMode = false
    if (inNum == tAns) {
      setScore(1);
    }
    else {
      document.getElementById('b' + inNum).style['box-shadow'] = "0 0 7px 1px rgba(0, 0, 0, 0.6),inset 0 0 35px 15px rgb(255, 0, 0)";
      setScore(-1);
    }
    document.getElementById('b' + tAns).style['box-shadow'] = "0 0 7px 1px rgba(0, 0, 0, 0.6),inset 0 0 35px 15px rgb(98, 153, 17)";
    setTimeout(nextQuestion, gData.answerDelay);
  }
};

function fQuestion() {
  qMode = true

  switch (gData.gameDef[window.gameCurLevel].qType) {
    case 1:
      color = arrRandomSelect(gData.colors, 3);
      shape = arrRandomSelect(arrCreateSeries(1, gData.shapMax, 1), 3);
      answer = arrRandomSelect(arrCreateSeries(0, 2, 1), 3);
      tAns = answer[2];
      for (i = 0; i < 3; i++) {
        document.getElementById('b' + i).style['box-shadow'] = "0 0 7px 1px rgba(0, 0, 0, 0.6),inset 0 0 15px 3px rgb(128, 128, 128)";
        document.getElementsByClassName('boxBack')[i].style.backgroundColor = color[i]
        document.getElementsByClassName('boxBack')[i].style['-webkit-mask-image'] = 'url("./img/' + shape[i] + '.png")'
      }
      document.getElementsByClassName('QBack')[0].style['-webkit-mask-image'] = 'url("./img/' + shape[answer[0]] + '.png")'
      document.getElementsByClassName('QBack')[0].style.backgroundColor = color[answer[1]]
      console.log(tAns + 1);
      break;
    case 2:
      color = arrRandomSelect(gData.colors, 1);
      num = arrRandomSelect(arrCreateSeries(1, 9, 1), 3);
      shape = arrRandomSelect(arrCreateSeries(1, gData.shapMax, 1), 3);
      answer = arrRandomSelect(arrCreateSeries(0, 2, 1), 3);
      tAns = answer[2];
      for (i = 0; i < 3; i++) {
        document.getElementById('b' + i).style['box-shadow'] = "0 0 7px 1px rgba(0, 0, 0, 0.6),inset 0 0 15px 3px rgb(128, 128, 128)";
        document.getElementsByClassName('boxBack')[i].style.backgroundColor = color[0]
        document.getElementsByClassName('boxBack')[i].style['-webkit-mask-image'] = 'url("./img/' + shape[i] + '.png")'
        document.getElementsByClassName('txt')[i].innerHTML = num[i]
      }
      document.getElementsByClassName('QBack')[0].style['-webkit-mask-image'] = 'url("./img/' + shape[answer[0]] + '.png")'
      document.getElementsByClassName('QBack')[0].style.backgroundColor = color[0]
      document.getElementsByClassName('qtxt')[0].innerHTML = num[answer[1]]
      console.log(tAns + 1);
      break;
    case 3:
      color = arrRandomSelect(gData.colors, 4);
      num = arrRandomSelect(arrCreateSeries(1, 9, 1), 4);
      shape = arrRandomSelect(arrCreateSeries(1, gData.shapMax, 1), 4);
      answer = arrRandomSelect(arrCreateSeries(0, 3, 1), 4);
      tAns = answer[3];
      for (i = 0; i < 4; i++) {
        document.getElementById('b' + i).style['box-shadow'] = "0 0 7px 1px rgba(0, 0, 0, 0.6),inset 0 0 15px 3px rgb(128, 128, 128)";
        document.getElementsByClassName('boxBack')[i].style.backgroundColor = color[i]
        document.getElementsByClassName('boxBack')[i].style['-webkit-mask-image'] = 'url("./img/' + shape[i] + '.png")'
        document.getElementsByClassName('txt')[i].innerHTML = num[i]
      }
      document.getElementsByClassName('QBack')[0].style['-webkit-mask-image'] = 'url("./img/' + shape[answer[0]] + '.png")'
      document.getElementsByClassName('QBack')[0].style.backgroundColor = color[answer[2]]
      document.getElementsByClassName('qtxt')[0].innerHTML = num[answer[1]]
      console.log(tAns + 1);
      break;

  }

};


nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};