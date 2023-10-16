const LogIn = ({ setUserLogin, setUserData }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [ribbonText, setRibbonText] = React.useState('');
    const [ribbonBack, setRibbonBack] = React.useState('');

    const userAuth = (username, password) => {
        fetch("https://dorsav2.dorsapackage.com/api/v1/verifyCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobile: username,
                password: password
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    setRibbonBack('bg-danger')
                    switch (response.status) {
                        case 400:
                            setRibbonText('Username Not Valid')
                            break;
                        case 404:
                            setRibbonText('Password not Correct !!')
                            break;
                    }
                    /*  throw new Error(`Request failed with status: ${response.status}`); */
                }
                return response.json();
            })
            .then((responseData) => {
                /* console.info(responseData); */
                if (responseData.success == '') {
                    setRibbonText(responseData.error)
                    setRibbonBack('bg-danger')
                } else {
                    setRibbonText('Welcome')
                    setRibbonBack('bg-success')
                    localStorage.setItem('uT', responseData.data.token)
                    localStorage.setItem('uN', responseData.data.name)
                    localStorage.setItem('uF', responseData.data.family)
                    localStorage.setItem('uI', responseData.data.userImage)
                    setTimeout(() => {
                        setUserLogin(true);
                        setUserData(responseData.data);
                        /* console.info(responseData.data); */
                    }, 300);
                }
            });
    };

    return (
        <>
            <div className="fal fa-circle-user text-muted mt-3 mb-4" style={{ fontSize: '5rem' }} />
            <form className='d-flex flex-column mb-3 w-100'>
                <div className="form-group mb-3 text-muted mx-4">
                    <label htmlFor="userName " style={{ paddingLeft: '10px' }}>Username</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="userName"
                        aria-describedby="emailHelp"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group mx-4 mb-3 text-muted">
                    <label htmlFor="userPass" style={{ paddingLeft: '10px' }}>Password</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="userPass"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div type="submit" onClick={() => userAuth(username, password)} className="btn btn-info w-50 py-1 px-2 mx-auto">login</div>
                <div id='statusRibbon' className={`text-center mt-3 text-white ${ribbonBack}`}>{ribbonText}</div>
            </form>

            <div className="text-muted w-50 d-flex justify-content-between align-items-center fs-4 mt-auto">
                <div className="fab fa-google text-danger" style={{ fontSize: '1.25rem ' }} />
                <div className="fab fa-microsoft text-info" />
                <div className="fab fa-apple" style={{ fontSize: '1.6rem ' }} />
            </div>
        </>
    );
};

const List = ({ gameList }) => {
    return (
        <div>

            {gameList.map((val, index) => (
                <div key={index}>{val.name}</div>
            ))}

        </div>
    )
}

const UserProfile = ({ setUserLogin, userData }) => {
    const [allGamesList, setAllGamesList] = React.useState([]);
    const [userGameList, setUserGameList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [userAdmin, setUserAdmin] = React.useState(true)
    const [userImage, setUserImage] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [userFamily, setUserFamily] = React.useState('')
    const [userToken, setUserToken] = React.useState('')
    const [gameName, setGameName] = React.useState('')
    const [showAdminConfig, setShowAdminConfig] = React.useState(false)

    const hooshItems = new Array(' منطقی ریاضی', 'دیداری فضایی', 'کلامی', 'موسیقایی', 'بدنی جنبشی', 'درون فردی', 'میان فردی', 'طبیعت گرا')


    const listFilter = (index) => {
        if (selectedIndex == index) {
            setSelectedIndex(-1)
            setUserGameList(allGamesList)
            
        } else {
            setSelectedIndex(index)
            let tempObj = []
            tempObj.length = 0
            setUserGameList(tempObj)
            allGamesList.map((val) => {
                if (val.gameType == index) {
                    tempObj.push(val)
                }
            })
            setUserGameList(tempObj)
        }

    }

    React.useEffect(() => {
        fetch("./games/gamesList.json")
            .then((response) => response.json())
            .then((data) => {
                setAllGamesList(data)
                setUserGameList(data);
            });
    }, []);

    /* React.useEffect(() => {
        setUserImage(userData.userImage);
        setUserName(userData.name);
        setUserFamily(userData.family);
        setUserToken(userData.token);
        (userData.userType == 'admin') ? setUserAdmin(true) : setUserAdmin(false);
        setUserAdmin(true)
    
        fetch("https://dorsav2.dorsapackage.com/api/v1/gameList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem('uT'),
                req: "gList"
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData) => {
                console.info(responseData)
            });
    }, []);
    */

    return (
        <div className='container-fluid p-0 m-0 w-100 h-100 d-flex flex-row-reverse'>
            <div id='profileSidebar' className='col-3 h-100 d-flex flex-column justify-content-between align-items-center py-2 overflow-hidden'>
                {/* <img src={userImage} style={{ borderRadius: '50%' }} width='50%' className='mt-3 border border-2 border-info' /> */}
                <img src={localStorage.getItem('uI')} style={{ borderRadius: '50%' }} width='50%' className='mt-3 border border-2 border-info' />
                {/* <div className='mt-3 mb-4 w-100 text-center userName overflow-hidden'>{userName} {userFamily}</div> */}
                <div className='mt-3 mb-4 w-100 text-center userName overflow-hidden'>{localStorage.getItem('uN')} {localStorage.getItem('uF')}</div>
                <div className='w-100 border-info border-1 border-top border-bottom py-2 mt-auto' style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {
                        hooshItems.map((val, index) => {
                            return (
                                <div key={index} className='w-100 text-end px-4 my-1 intItems' onClick={() => listFilter(index + 1)}>هوش {val}</div>
                            )
                        })
                    }
                </div>
                <div className="mt-3 px-3 text-muted w-100 d-flex">
                    <div className='fas fa-sign-out settingIcons me-3' onClick={() => {
                        localStorage.clear()
                        setUserLogin(false)
                    }} />
                    {
                        (userAdmin) ? <div className='fas fa-cog settingIcons' onClick={() => {
                            (showAdminConfig) ? setShowAdminConfig(false) : setShowAdminConfig(true)
                        }} /> : null
                    }
                </div>
            </div>
            <div className='col-9'>
                <div className='bg-white h-100 border ms-3 rounded-3 overflow-hidden d-flex flex-column justify-content-between'>
                    {
                        (showAdminConfig) ? <div className='w-100 px-3 py-3 adminContainer'>
                            <form className='d-flex flex-row-reverse flex-wrap justify-content-between align-items-center h-100'>
                                <div className='text-end' style={{ width: '45%' }}>
                                    <label htmlFor="gameName " className='adminLable'>نام بازی </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="gameName"
                                        onChange={(e) => setGameName(e.target.value)}
                                    />
                                </div>
                                <div className='text-end' style={{ width: '45%' }}>
                                    <label htmlFor="gameAddress " className='adminLable'>محل بازی</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="gameAddress"
                                        onChange={(e) => setGameAddress(e.target.value)}
                                    />
                                </div>
                                <div className='text-end'>
                                    <label htmlFor="gameType" className='adminLable'>نوع بازی</label>
                                    <select
                                        id="gameType"
                                        className="form-select form-select-sm text-end"
                                        onChange={(e) => setGameType(e.target.value)}
                                    >
                                        {
                                            hooshItems.map((val, index) => {
                                                return (
                                                    <option key={index} value={index}>{val}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </form>
                        </div>
                            : null
                    }

                    <div className='flex-fill p-2 text-end'>
                        {
                            (userGameList.length != 0) ? <List gameList={userGameList} /> : null
                        }
                    </div>
                </div>
            </div>



            {/* <div id='pTxt'>UserProfile</div>
             */}
        </div>
    );
};

const MainContainer = () => {
    const [userLogin, setUserLogin] = React.useState(false);
    const [userData, setUserData] = React.useState('');

    React.useEffect(() => {
        (localStorage.getItem('uT') != null) ? setUserLogin(true) : null
    }, [userLogin]);

    return (
        <div className={`d-flex flex-column align-items-center ${userLogin ? 'userProfile py-3' : 'login py-2'}`}>
            {userLogin ? <UserProfile setUserLogin={setUserLogin} setUserData={setUserData} userData={userData} /> : <LogIn setUserLogin={setUserLogin} setUserData={setUserData} />}
        </div>
    );
};

ReactDOM.render(
    <MainContainer />,
    document.getElementById('root')
);
