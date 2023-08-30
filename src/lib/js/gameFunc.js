const weekDaysRef = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
const mounthRef = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const yearRefDay = [1, 32, 63, 94, 125, 156, 187, 217, 247, 277, 307, 337, 366]
const faCharRef = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیآ"
//-------------------------------------------------------------------------------------------------------------------------------------------
function randRange(min, max, step) {
  var maxSt = (max - min) / step;
  var randomStep = Math.floor(Math.random() * (maxSt + 1));
  var randomNum = (randomStep * step) + min;
  return randomNum;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function arrRandomSelect(arr, count) {
  if (count > arr.length) {
    console.log("arrRandomSelect --> input Error ");
  } else {
    var temp = new Array();
    for (i = 0; i < arr.length; i++) {
      temp[i] = arr[i];
    }
    var outArr = new Array(count);
    for (i = 0; i < count; i++) {
      m = randRange(0, temp.length - 1, 1);
      outArr[i] = temp[m];
      temp.splice(m, 1);
    }
  }
  return outArr;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function arrCreateSeries(min, max, step) {
  maxSt = Math.floor((max - min) / step);
  var outArr = new Array();
  for (i = 0; i < maxSt + 1; i++) {
    outArr[i] = min + (i * step);
  }
  return outArr;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function arrAreEqual(a, b) {
  var isEqual = true;
  if (a.length != b.length) {
    isEqual = false;
  } else {
    for (i = 0; i < a.length; i++) { //console.log(i)
      if (a[i] != b[i]) {
        isEqual = false;
        break;
      }
    }
  }
  return isEqual;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function stringCharRep(inText, sourceStr, replStr) {
  while (inText.indexOf(sourceStr) >= 0) {
    b = inText.length - 1;
    a = inText.indexOf(sourceStr);
    t1 = inText.substring(0, a);
    inText = t1 + replStr + inText.substr(a + 1, b);
  }
  return inText;
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function stringToArrNum(inText) {
  var outArr = new Array();
  outArr.length = 0;
  for (i = 0; i < inText.length; i++) {
    outArr.push(chToNumFa(inText.charAt(i)));
  }
  return outArr;
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function chToNumFa(inText) {
  out = faCharRef.indexOf(inText) + 1
  if (out != 0)
    return out
  else
    return "invalid input in persian char"
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function numToChFa(inNum) {
  out = faCharRef.charAt(inNum - 1)
  if (out != "")
    return out
  else
    return "invalid input in persian char index"
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function isValInArr(inArr, val) {
  var out = false;
  for (i = 0; i < inArr.length; i++) {
    if (val == inArr[i]) {
      out = true;
    }
  }
  return out;
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function countValInArr(inArr, val) {
  var count = 0;
  var out = false;
  for (i = 0; i < inArr.length; i++) {
    if (val == inArr[i]) {
      count++;
    }
  }
  return count;
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function numToDay(inPut) {
  out = weekDaysRef[inPut - 1]
  if (out != undefined)
    return out
  else
    return "invalid input in day num"

};
//-------------------------------------------------------------------------------------------------------------------------------------------
function numToMonth(inPut) {
  out = mounthRef[inPut - 1];
  if (out != undefined)
    return out
  else
    return "invalid input in mounth num"
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function numToDate(inNum, firstDayInd) {
  let monthMapArr = new Array(0, 3, 6, 2, 5, 1, 4, 6, 1, 3, 5, 0);
  if (inNum > 0 && inNum < 366) {
    if (inNum < 187) {
      month = Math.ceil(inNum / 31);
      day = inNum - (month - 1) * 31;
    } else if (inNum < 337) {
      inNum = inNum - 186;
      month = Math.ceil(inNum / 30);
      day = inNum - (month - 1) * 30;
      month = month + 6;
    } else {
      month = 12;
      day = inNum - 336;
    }
    weekDayInd = (monthMapArr[month - 1] + firstDayInd + day - 1) % 7;
    weekDay = numToDay(weekDayInd);
    outDate = [day, numToMonth(month), month, weekDay, weekDayInd];
    return outDate;
  } else {
    return ["invalid input"];
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function valInArrIndArr(inArr, val) {
  var outArr = new Array();
  for (i = 0; i < inArr.length; i++) {
    if (val == inArr[i]) {
      outArr.push(i);
    }
  }
  if (outArr.length == 1) {
    return outArr[0];
  } else if (outArr.length > 1) {
    return outArr;
  } else {
    return -1;
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function mdArraySort(inArr, ind) {
  var b = new Array();
  var c = new Array();
  for (i = 0; i < inArr.length; i++) {
    b.push(inArr[i][ind]);
  }
  b = b.sort(Array.NUMERIC);
  for (i = 0; i < inArr.length; i++) {
    for (j = 0; j < inArr.length; j++) {
      if (b[j] == inArr[i][ind]) {
        c[j] = inArr[i];
        break;
      }
    }
  }
  return c;
};
//-------------------------------------------------------------------------------------------------------------------------------------------
function findRange(inArr, inVal) {
  inArr.map((val, index) => {
    if (inVal >= val) out = index
  })
  if (inVal > inArr[inArr.length - 1]) {
    console.info('out of range upper')
    out = undefined
  }
  if (inVal < inArr[0]) {
    console.info('out of range downer')
    out = undefined
  }
  return out
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function persianCalendare(dayNum, fdYear) {
  mounthInd = findRange(yearRefDay, dayNum)
  if (mounthInd != undefined) {
    outMounth = numToMonth(mounthInd + 1)
    outDay = dayNum - yearRefDay[mounthInd] + 1
  }
  wDCount = dayNum + fdYear - 1
  outWeekDay = (wDCount % 7 == 0) ? 7 : wDCount % 7
  out = {
    "weekday": numToDay(outWeekDay),
    "weekdayNum": outWeekDay,
    "day": outDay,
    "mounth": outMounth,
    "mounthNum": mounthInd + 1,
    "firstweekday": numToDay(fdYear),
    "firstweekdayNum": fdYear
  }
  return out
}


