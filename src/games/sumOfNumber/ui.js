const divClk = (n) => () => window.ansCh(n)
const nxBF = () => () => window.nxBtnFunc()

const Box = (props) => {
  return (
    <div className="dokme mb-2" id={"d" + props.num} num={props.num} onClick={divClk("d" + props.num)}></div>
  )
}

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          هدف بازی پیدا کردن جمع‌های عدد خواسته شده می‌باشد. زمانی که شما روی یک عدد کلیک نمائید، به رنگ قرمز درآمده (در صورت تغییر می‌توانید مجدد روی آن کلیک نمائید) و زمانی که به پاسخ  صحیح دست یابید، تمامی اعداد انتخابی سبز و از جدول حذف می‌شوند. دقت داشته باشید که اگر پاسخ صحیح نباشد، اعداد خود به خود از حالت کلیک در می‌آید.
        </div>
        <div>
          لازم به ذکر است تا زمانی که صفحه سبز رنگ پائین جدول تکمیل نگردد، امکان رفتن به صفحه بعد را نخواهید داشت. و تعداد صفحات در هر مرحله محدود می‌باشد.
        </div>
      </div>
    )
  }
}

class Help extends React.Component {
  render() {
    return (
      <div >
        <div>
          در این بازی می‌بایست اعداد را طوری انتخاب نمائید تا مجموع آنها برابر با عدد خواسته شده گردد. دقت داشته باشید محدودیتی در تعداد گزینه های انتخابی وجود ندارد و تا زمانی که صفحه بعدی فعال نگردیده می‌بایست در همان صفحه به سوالات پاسخ دهید.
        </div>
        <div>
          لازم به ذکر است که این بازی شامل 9 مرحله به صورت ذیل می‌باشد؛
        </div>
        <div>
          - مرحله اول: مجموع اعداد می‌بایست 10 گردد.
        </div>
        <div>
          - مرحله دوم: مجموع اعداد می‌بایست 11 گردد.
        </div>
        <div>
          - مرحله سوم: مجموع اعداد می‌بایست 12 گردد.
        </div>
        <div>
          - مرحله چهارم: مجموع اعداد می‌بایست 13 گردد.
        </div>
        <div>
          - مرحله پنجم: مجموع اعداد می‌بایست 14 گردد.
        </div>
        <div>
          - مرحله ششم: مجموع اعداد می‌بایست 15 گردد.
        </div>
        <div>
          - مرحله هفتم: مجموع اعداد می‌بایست 16 گردد.
        </div>
        <div>
          - مرحله هفتم: مجموع اعداد می‌بایست 17 گردد.
        </div>
        <div>
          - مرحله نهم: مجموع اعداد می‌بایست 18 گردد.
        </div>
        <div>
          در این بازی دقت داشته باشید که هر چه اعداد بزرگ‌تری انتخاب نمائید، تعداد انتخاب شما تا عدد 11 کمتر شده و سرعت کارتان بالاتر خواهد رفت. به طور مثال، دو عدد 3 و8 با یکدیگر 11 شده و چهار عدد 1، 6، 2 و 2 نیز 11 می‌شود. ولی مورد اول سریع‌تر خواهد بود.
        </div>
      </div>
    )
  }
}

const SumBox = (props) => {

  console.info(props.target)

  return (
    <div className={'mx-2 px-1 ' + ((props.target) ? 'text-white bg-danger' : '')}>
      {props.val}
    </div>
  )
}

class GameUI extends React.Component {
  render() {
    return (
      <div className="game">
        {Array.from({ length: 30 }, (_, index) => (
          <Box key={index + 1} num={index + 1} />
        ))}
        <div className="dokme mt-2" id="next_page" onClick={nxBF()}>
          <div className='text'>صفحه بعدی</div>
          <div className="green" />
        </div>
        <div className='d-flex justify-content-center flex-fill bg-white text-center sumContainer mt-2'>
          {gData.gameDef.map((gameItem, index) => (
            <SumBox val={gameItem.sumVal} target={(index == window.gameCurLevel) ? true : false} />
          ))}
        </div>
      </div>

    )
  }
}