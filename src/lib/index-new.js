
const Profile = ({ inID,inAdd }) => {
  return (
    <div>
      <h1>Profile</h1>
      <iframe
        title="Profile Video"
        width="560"
        height="315"
        src={`./games/11/index.html`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}


const Login = ({ mainContHandler }) => {
  return (
    <div onClick={() => mainContHandler("Profile")}>Login</div>
  );
}

const MainContainer = () => {
  const [mainContainer, setMainContainer] = React.useState('Login');

  const mainContainerHandler = (mainCont) => {
    setMainContainer(mainCont);
  }


  return (
    <div className='mainContainer w-100 h-100 d-flex justify-content-center align-items-center'>
      {mainContainer === "Profile" ? <Profile inAdd={'youtube'} inID={'F7673DGL8Pc'} /> : <Login mainContHandler={mainContainerHandler} />}
    </div>
  );
}

ReactDOM.render(
  <MainContainer />,
  document.getElementById('root')
);
