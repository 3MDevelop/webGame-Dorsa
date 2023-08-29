
const sound = new Audio("./sound.mp3");


var ansArr = new Array();
var qArr = new Array();
var scaleArr = new Array();
var selArr = new Array();
var qMode


function num(n) {
  if (qMode) {
    if (selArr.indexOf(qArr[n]) == -1) {
      selArr.push(qArr[n])
      document.getElementsByClassName('sort')[n].innerHTML = selArr.length
    } else {
      document.getElementsByClassName('sort')[n].innerHTML = ""
      selArr.splice(selArr.indexOf(qArr[n]), 1);
      for (let index = 0; index < selArr.length; index++) {
        document.getElementsByClassName('sort')[qArr.indexOf(selArr[index])].innerHTML = index + 1

      }
    }
    if (selArr.length == 4) {
      crInd = 0
      for (let i = 0; i < selArr.length; i++) {
        if (selArr[i] == ansArr[i]) {
          crInd++
          document.getElementsByClassName('sort')[qArr.indexOf(selArr[i])].style.backgroundColor = "green"
        } else {
          document.getElementsByClassName('sort')[qArr.indexOf(selArr[i])].innerHTML += "(" + (ansArr.indexOf(selArr[i]) + 1) + ")"
          document.getElementsByClassName('sort')[qArr.indexOf(selArr[i])].style.backgroundColor = "red"
        }
      }
      if (crInd == 4) {
        qMode = false
        setScore(1)
        timeOut = setTimeout(nextQuestion, gData.answerDelay);
      } else {
        qMode = false
        setScore(-1)
        timeOut = setTimeout(nextQuestion, gData.answerDelay);
      }
    }
  }
}


function fQuestion() {
  qMode = true;
  selArr.length = 0;
  ansArr.length = 0;
  scaleArr.length = 0;
  qArr.length = 0;
  scaleArr = new Float64Array(arrRandomSelect(arrCreateSeries(gData.gameDef[gameCurLevel].minCm, gData.gameDef[gameCurLevel].maxCm, gData.gameDef[gameCurLevel].stepCm), 4));
  ruleArr = arrRandomSelect(gData.scaleArr, 4);
  qArr.push(...scaleArr)
  ansArr.push(...scaleArr.sort())
  qType = randRange(1, 2, 1)
  if (qType == 1) {
    document.getElementsByClassName('inf')[0].innerHTML = "مقادیر را از کم به زیاد مرتب کنید"
  } else {
    document.getElementsByClassName('inf')[0].innerHTML = "مقادیر را از زیاد به کم مرتب کنید"
    ansArr.reverse()

    console.info('test massage22    2 ')
  }
  console.log(qArr)
  /* console.log(ansArr) */
  console.log('-------------')
  for (i = 0; i < 4; i++) {
    document.getElementsByClassName('un')[i].innerHTML = ruleArr[i][0]
    document.getElementsByClassName('sort')[i].innerHTML = ""
    document.getElementsByClassName('sort')[i].style.backgroundColor = "#1759e9"
    document.getElementsByClassName('num')[i].innerHTML = Math.floor(qArr[i] / ruleArr[i][1] * 100) / 100
  }
};

nextQuestion = function () {
  if (qCount > gData.gameDef[window.gameCurLevel].qMax) {
    gameEndFunc()
  } else {
    fQuestion()
  }
};

/* 



qFunc = function ()
{
if (!qMode)
{
ansMc._visible = true;
qMode = true;
ansMc.txt1.text = ansMc.txt2.text = ansMc.txt3.text = ansMc.txt4.text = "";
ansMc.txts1.text = ansMc.txts2.text = ansMc.txts3.text = ansMc.txts4.text = "";
ansMc.txt1.textColor = ansMc.txt2.textColor = ansMc.txt3.textColor = ansMc.txt4.textColor = 0x333333;
ansMc.txts1.textColor = ansMc.txts2.textColor = ansMc.txts3.textColor = ansMc.txts4.textColor = 0x333333;
ansMc.shadeMc1.gotoAndStop(1);
ansMc.shadeMc2.gotoAndStop(1);
ansMc.shadeMc3.gotoAndStop(1);
ansMc.shadeMc4.gotoAndStop(1);
}
};

selItemFunc = function (inNum: Number) {
  if (inNum != selIndex[selIndex.length - 1] && !_root.isValInArr(selIndex, inNum)) {
    selIndex.push(inNum);
    ansArr.push(qArr[inNum]);
    this["optionMc" + (inNum + 1)].gotoAndStop(4);
  }
  else if (inNum == selIndex[selIndex.length - 1]) {
    selIndex.length = selIndex.length - 1;
    ansArr.length = ansArr.length - 1;
    this["optionMc" + (inNum + 1)].gotoAndStop(1);
  }
  for (i = 1; i < 5; i++) {
    if (selIndex[i - 1] != undefined) {
      ansMc["txt" + i].text = qArr[selIndex[i - 1]][1];
      ansMc["txts" + i].text = qArr[selIndex[i - 1]][2];
    }
    else {
      ansMc["txt" + i].text = "";
      ansMc["txts" + i].text = "";
    }
  }
  if (ansArr.length == 4) {
    qMode = false;
    qArr = _root.mdArraySort(qArr, 0);
    if (_root.arrAreEqual(ansArr, qArr)) {
      _root.setScore(1);
    }
    else {
      _root.setScore();
    }
    for (i = 0; i < 4; i++) {
      ansMc["txt" + (i + 1)].textColor = 0xffffff;
      ansMc["txts" + (i + 1)].textColor = 0xffffff;
      if (qArr[i][0] == ansArr[i][0]) {
        ansMc["shadeMc" + (i + 1)].gotoAndStop(3);
      }
      else {
        ansMc["shadeMc" + (i + 1)].gotoAndStop(2);
      }
      ansMc["txt" + (i + 1)].text = qArr[i][1];
      ansMc["txts" + (i + 1)].text = qArr[i][2];
    }
    trace("---------");
    setTimeout(nextQuestion, answerDelay);
  }
};

*/