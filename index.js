window.onload = function () {
  //当前日期
  var dateTime = new Date ();
  var y, m, d;
  y = dateTime.getFullYear ();
  m = dateTime.getMonth () + 1; // getMonth() 返回 0-11
  d = dateTime.getDate ();
  document.querySelector ('.current-date').innerHTML = `${y}年${m}月${d}日`;
  getMonthDay (y, m);
};

//某年、月的第一天是周几
function getFirstWeekDay (y, m) {
  var dateTime = new Date ();
  dateTime.setFullYear (y, m - 1, 1);
  return dateTime.getDay ();
}
//返回某年/月的最后一天是星期几
function getLastWeekDay (week, day) {
  var upper = week ? week - 1 : 6;
  var day = 42 - upper - day;
  var _week = 7 - day % 7;
  return _week == 7 ? 0 : _week;
}
//获取某月的天数
function getMonthDay (y, m) {
  var day;
  if (m == 2) {
    //判断闰年还是平年
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
      day = 29;
    } else {
      day = 28;
    }
  } else {
    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
      day = 31;
    } else {
      day = 30;
    }
  }
  getInit (y, m, day);
}
//上个月的最后一天
function getLastDay (y, m) {
  var dateTime;
  if (m > 1) {
    dateTime = new Date (y, m - 1, 0);
  } else {
    dateTime = new Date (y - 1, 12, 0);
  }
  return dateTime.getDate ();
}
//循环宫格
function getInit (y, m, day) {
  var week = getFirstWeekDay (y, m); //返回 0-6, 0表示周日
  var lastDay = getLastDay (y, m); //上个月的最后一天
  var lastWeek = getLastWeekDay (week, day); //当前月的最后一天是周几
  var weekDay = [];
  var list = [], nextList = [], currentList = [];
  if (week) {
    //     //上个月的最后几天
    for (let i = lastDay; i <= lastDay && i > 0; i--) {
      list.push ({
        day: i,
        isShow: false,
      });
    }
    weekDay = list.slice (0, week);
  }
  if (lastWeek != 0) {
    //下个月的前几天
    for (let j = 1; j <= 7 - lastWeek; j++) {
      nextList.push ({
        day: j,
        isShow: false,
      });
    }
  }
  //当前月的所有天数
  for (let k = 1; k <= day; k++) {
    currentList.push ({
      day: k,
      isShow: true,
    });
  }
  weekDay = weekDay.concat (currentList, nextList);
  groupArray (weekDay, 7);
}

//把一个数组分为若干个数组
function groupArray (list, groupIndex) {
  var index = 0;
  var newArray = [];
  while (index < list.length) {
    newArray.push (list.slice (index, (index += groupIndex)));
  }
  var tbody = document.querySelector ('tbody');
  newArray.forEach ((item, index) => {
    var tr = document.createElement ('tr');
    tbody.appendChild (tr);
  });
  getElement (newArray);
}

function getElement (list, index = 0) {
  var tbody = document.querySelector ('tbody');
  var elTr = tbody.querySelectorAll ('tr');
  if (list.length > index) {
    list[index].forEach (key => {
      var td = document.createElement ('td');
      if (key.isShow) {
        td.innerHTML = key.day;
      }
      elTr[index].appendChild (td);
    });
    index += 1;
    getElement (list, index);
  }
}
