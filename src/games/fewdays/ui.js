const onNumClick = (n) => () => window.num(n)
const hFunc = () => window.hideFunc()

class GameDis extends React.Component {
  render() {
    return (
      <div>
        <div>
          در این بازی در مرحله مبتدی، تنها می‌بایست با توجه به صورت سوال، تعداد روزهای موجود بین دو تاریخ مبدأ و مقصد را مشخص نمائید. در مرحله متوسط علاوه بر محاسبه تعداد روز، می‌بایست در نهایت تعداد هفته را به عنوان پاسخ صحیح اعلام فرمائید. در مرحله پیشرفته نیز تعداد روزی که در صورت سوال از شما خواسته شده را با توجه به دو تاریخ مبدأ و مقصد به عنوان پاسخ صحیح حساب کرده و با زدن علامت سوال، پاسخ صحیح را وارد نمائید.
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
          در این بازی تا زمانی که شما روی گزینه سوال کلیک ننمائید، صفحه سوال باقی می‌ماند. لذا پس از محاسبه و به منظور پاسخ دهی بایستی روی گزینه سوال کلیک و عدد مورد را وارد نمائید.
        </div>
        <div>
          در این بازی شما می‌توانید تعداد روزهای میان مبدأ و مقصد را محاسبه کرده و حاصل را بر 7 تقسیم نمائید. پاسخ تعداد روزهای خواسته شده می‌گردد. البته در نظر داشته باشید که به روز مبدأ و باقیمانده تقسیم نیز می‌بایست توجه فرمائید.
        </div>
      </div>
    )
  }
}


const WDay = (props) => {
  return (
    <div className='weekD' onClick={()=>{boxSelect(props)}}>
      {props.label}
    </div>
  );
};

const Days = (props) => {
  return (
    <div className='dayNum'>
      {props.num}
    </div>
  )
}

const Mounth = (props) => {
  return (
    <div className='mounth' >
      {props.name}
    </div>
  )
}

const DaysContainer = () => {
  return (
    <div className='daysContainer'>
      {
        Array.from({ length: 31 }, (_, index) => index + 1).map((num, index) => (
          <Days key={index} num={num} />
        ))
      }
    </div>
  )
}

const WeekContainer = () => {
  return (
    <div className='weekContainer'>
      {weekDaysRef.map((day, index) => (
        <WDay key={index} id={"W" + index} label={day} boxCat={"W"} num={index} />
      ))}
    </div>
  )
}

const MounthContainer = () => {
  return (
    <div className='mounthContainer'>
      {
        mounthRef.map((name, index) => (
          <Mounth key={index} ind={index} name={name} />
        ))
      }
    </div>
  )
}

const AnswerBox = () => {

  switch (gData.gameDef[gameCurLevel].qType) {
    case 1:
      return (
        <WeekContainer />
      )
    case 2:
      return (
        <>
          <DaysContainer />
          <MounthContainer />
        </>
      )
    case 3:
      return (
        <>
          <WeekContainer />
          <DaysContainer />
          <MounthContainer />
        </>
      )
  }
}

const GameUI = () => {
  return (
    <div className="game">
      <div id='qPlace' className='qPlace'></div>
      <AnswerBox />
    </div>
  );
};
