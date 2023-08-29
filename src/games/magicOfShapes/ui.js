const onNumClick = (n) => () => window.ansCheck(n)

const GameDis = () => {
  return (
    <div>
      <div>
        در این بازی با کلیک بر روی گزینه مورد نظر، پاسخ صحیح نشان داده شده و به صورت خودکار، سوال بعدی نمایش داده می‌شود.
      </div>
      <div>
        دقت داشته باشید که امکان تغییر گزینه وجود ندارد.
      </div>
    </div>
  )
}

const Help = () => {
  return (
    <div>
      <div>
        در این بازی در مرحله مبتدی، یک شکل رنگی نشان داده می‌شود که هر یک از مولفه‌های آن (شکل و رنگ) از یکی از گزینه‌ها انتخاب شده است. لذا شما می‌بایست گزینه ای را انتخاب نمائید که هیچ مولفه‌ای از آن گزینه انتخاب نشده است.
      </div>
      <div>
        در مرحله متوسط، یک شکل با عددی داخل آن نشان داده می‌شود که هر یک از مولفه‌های آن (شکل و عدد) از یکی از گزینه‌ها انتخاب شده است. لذا شما می‌بایست گزینه ای را انتخاب نمائید که هیچ مولفه‌ای از آن گزینه انتخاب نشده است.
      </div>
      <div>
        در مرحله پیشرفته نیز، یک شکل رنگی با عددی نشان داده می‌شود که هر یک از مولفه‌های آن (شکل، رنگ و عدد) از یکی از گزینه‌ها انتخاب شده است. لذا شما می‌بایست گزینه ای را انتخاب نمائید که هیچ مولفه‌ای از آن گزینه انتخاب نشده است.
      </div>
      <div>
        در مرحله مبتدی، در ابتدا با توجه به مشخص بودن رنگ، ابتدا گزینه ای که رنگ آن با صورت سوال یکی است حذف می‌شود، سپس شکل و در نهایت به پاسخ صحیح دست می‌یابید.
      </div>
      <div>
        در مرحله متوسط نیز در ابتدا گزینه‌ای که شکل آن با صورت سوال یکی بوده حذف می‌شود و سپس عدد حذف شده و در نهایت به پاسخ صحیح دست می‌یابید.
      </div>
      <div>
        و مرحله پیشرفته نیز ترکیبی از دو مرحله قبل است.
      </div>
    </div>
  )
}

const Box = (props) => {
  return (
    <div className="Pics" id={"b" + props.num} onClick={onNumClick(props.num)}>
      <div className="boxBack"></div>
      <div className="txt text-dark" style={{ direction: "ltr" }}></div>
      <div className="DNum">{props.num + 1}</div>
    </div>
  )
}

const GameUI = () => {
  let boxCount = [3, 3, 4][gData.gameDef[window.gameCurLevel].qType - 1]
  let cellArr = Array.from(Array(boxCount).keys())
  return (
    <div className="game bg-info" >
      <div className="QPic">
        <div className="QBack"></div>
        <div className="qtxt"></div>
      </div>
      <div className="APic">
        {cellArr.map((index) => <Box num={index} />)}
      </div>
    </div>
  )
}