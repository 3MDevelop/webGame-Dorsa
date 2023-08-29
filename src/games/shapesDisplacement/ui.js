const onNumClick = (n) => () => window.ansCheck(n)
const hClick = () => window.hideFunc()

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          .در این بازی جدولی شامل عکس‌های مختلف نمایش داده می‌شود. پس از چند ثانیه جدول حذف شده و جای دو شکل با یکدیگر جابجا شده است. شما می‌بایست دو شکل تغییر مکان یافته را انتخاب نمائید
        </div>
        <div>
          .دقت داشته باشید که جدول برای چند ثانیه نمایش داده می‌شود و سپس به صورت خودکار حذف شده و صفحه جواب نمایش داده می‌شود
        </div>
      </div>
    )
  }
}

class Help extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی جدولی شامل عکس‌های مختلف نمایش داده می‌شود. پس از چند ثانیه جدول حذف شده و جای دو شکل با یکدیگر جابجا شده است. شما می‌بایست دو شکل تغییر مکان یافته را انتخاب نمائید.
        </div>
        <div>
          لازم به ذکر است که این بازی شامل 9 مرحله به صورت ذیل می‌باشد؛
        </div>
        <div>
          - مرحله اول تا سوم: جدول 2*2 با 4 عکس
        </div>
        <div>
          - مرحله چهارم تا ششم: جدول 3*3 با 9 عکس
        </div>
        <div>
          - مرحله هفتم تا نهم: جدول 4*4 با 16 عکس
        </div>
        <div>
          در این بازی شما می‌توانید تنها بخشی از جدول را ملاحظه نمائید. اگر سوال در مورد همان بخش بود که به راحتی می‌توان پاسخ داد، در غیر اینصورت یکی از اشکالی خواهد بود که شما ملاحظه نکرده‌اید.
        </div>
      </div>
    )
  }
}

const Box = (props) => {
  return (
    <div className={"pics" + props.boxNum} id={"p" + props.num} onClick={onNumClick(props.num)}></div>
  )
}

class GameUI extends React.Component {
  render() {
    let layout
    let cellArr = Array.from(Array(gData.gameDef[gameCurLevel].cellCount).keys())
    switch (cellArr.length) {
      case 4:
        layout = "1"
        break;
      case 9:
        layout = "2"
        break;
      case 16:
        layout = "3"
        break;
    }
    return (
      <div className="gContainerBack" id="Main">
        <div className={"layout" + layout}>
          <div className="BackGround" id="BackGround">
            {cellArr.map((cellArr) => <Box key={cellArr} num={cellArr} boxNum={layout} />)}
            <div id="btn" onClick={hClick}>
              <div id="btnBack"></div>
              <div id="btnTxt">سوال</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}