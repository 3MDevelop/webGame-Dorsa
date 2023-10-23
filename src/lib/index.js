const LogIn = ({ setContentPage, setUserData }) => {
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
                if (responseData.success == '') {
                    setRibbonText(responseData.error)
                    setRibbonBack('bg-danger')
                } else {
                    setRibbonText('Welcome')
                    setRibbonBack('bg-success')
                    localStorage.setItem('uT', responseData.data.api_token)
                    localStorage.setItem('uN', responseData.data.name)
                    localStorage.setItem('uF', responseData.data.family)
                    localStorage.setItem('uI', responseData.data.userImage)
                    localStorage.setItem('uA', responseData.data.is_admin)
                    setTimeout(() => {
                        console.info(responseData.data);
                        setContentPage('profile');
                        setUserData(responseData.data);
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

const AdminPanel = ({ hooshItems, setAllGamesList, setUserGameList }) => {
    const [gameName, setGameName] = React.useState('')
    const [gameAddress, setGameAddress] = React.useState('')
    const [gameType, setGameType] = React.useState(1)
    return (
        <div className='w-100 px-3 py-3 adminContainer'>
            <form id='addGameForm' className='d-flex flex-row-reverse flex-wrap justify-content-between align-items-end h-100'>
                <div className='text-end' style={{ width: '45%' }}>
                    <label htmlFor="gameName " className='adminLable'>نام بازی </label>
                    <input
                        type="text"
                        className="form-control form-control-sm text-end"
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
                        onChange={(e) => setGameType(Math.abs(e.target.value) + 1)}
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
                <div>
                    <button
                        type="button"
                        className="btn btn-primary ms-4"
                        onClick={() => {
                            fetch("https://dorsav2.dorsapackage.com/api/v1/addGame", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    api_token: 'H7LHrwwSdgF6sbXmCGnQBwJMuEAIPzWdtWHR2mJc',
                                    req: 'addGame',
                                    gamePath: gameAddress,
                                    gameName: gameName,
                                    gameType: gameType,
                                    score: [0]
                                }),
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(`Request failed with status: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                .then((addGameResponse) => {
                                    console.info(addGameResponse)
                                    fetch("https://dorsav2.dorsapackage.com/api/v1/gameList", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            api_token: localStorage.getItem('uT'),
                                            req: 'gList'
                                        }),
                                    })
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error(`Request failed with status: ${response.status}`);
                                            }
                                            return response.json();
                                        })
                                        .then((responseData) => {
                                            setAllGamesList(responseData.data)
                                            setUserGameList(responseData.data);
                                            const form = document.getElementById('addGameForm')
                                            form.reset();
                                            setGameName('')
                                            setGameAddress('')
                                            setGameType(1)
                                        });
                                });
                        }}>
                        اضافه کردن بازی
                    </button>
                </div>
            </form>
        </div>
    )
}

const List = ({ gameList, adminSit, setAllGamesList, setUserGameList }) => {
    const levelColor = ["#31ad76", "#95bf3d", "#0abbc5", "#C35BA2", "#D480B3", "#F173AC", "#E95752", "#F58220", "#FBAE49"]
    console.info(gameList)
    return (
        <div>
            {gameList.map((val, index) => {
                val.score = [3, 3, 3, 3, 3, 3, 3, 3, 3]
                return (
                    <div key={index}
                        className='w-100 mb-2 rounded-3 d-flex flex-row-reverse justify-conten-between align-items-center overflow-hidden'
                        style={{ backgroundColor: "#f4f4f4", height: '85px' }}
                    >
                        <div className='h-100 ms-2' style={{ backgroundColor: levelColor[val.score.length - 1], width: '5px' }}></div>
                        <div className='rounded-3 overflow-hidden'>
                            <img src={`games/${val.path}/icon.png`} height='70px' />
                        </div>
                        <div className="me-3 d-flex flex-column ms-auto">
                            <div className='fw-bolder text-muted' style={{ fontSize: '1.4rem' }}>
                                {val.name}
                            </div>
                            <div className='d-flex flex-row-reverse mt-2'>
                                {
                                    val.score.map((val, index) => (
                                        <div key={index} className='text-white ms-1 aspect1 d-flex justify-content-center align-items-center' style={{ backgroundColor: levelColor[index] }}>{val}</div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            (adminSit) ? <div className='fas fa-close h-100 d-flex align-items-center justify-content-center text-white px-3'

                                style={{
                                    backgroundColor: 'rgba(220,220,220,1)',
                                    fontSize: '1.3rem'
                                }}
                                onClick={() => {
                                    console.info('ops')
                                    fetch("https://dorsav2.dorsapackage.com/api/v1/removeGame", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            api_token: 'H7LHrwwSdgF6sbXmCGnQBwJMuEAIPzWdtWHR2mJc',
                                            req: 'removeGame',
                                            gamePath: val.path
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
                                            fetch("https://dorsav2.dorsapackage.com/api/v1/gameList", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    api_token: localStorage.getItem('uT'),
                                                    req: 'gList'
                                                }),
                                            })
                                                .then((response) => {
                                                    if (!response.ok) {
                                                        throw new Error(`Request failed with status: ${response.status}`);
                                                    }
                                                    return response.json();
                                                })
                                                .then((responseData) => {
                                                    /*  console.info(responseData.data[1].score) */
                                                    /* responseData.data[0].score = [0] */
                                                    setAllGamesList(responseData.data)
                                                    setUserGameList(responseData.data);
                                                });
                                        });
                                }}
                            /> : null
                        }
                        <div
                            className='fas fa-play h-100 d-flex align-items-center justify-content-center text-white px-3'
                            style={{
                                backgroundColor: levelColor[val.score.length - 1],
                                transform: 'rotate(180deg)',
                                fontSize: '1.3rem'
                            }}
                            onClick={() => {
                                console.info(val.path);
                                console.info(val.score);
                                localStorage.setItem(val.path, JSON.stringify(val.score));
                                window.location.href = "./games/" + val.path;
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const UserProfile = ({ setContentPage, userData }) => {
    const [allGamesList, setAllGamesList] = React.useState([]);
    const [userGameList, setUserGameList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [userAdmin, setUserAdmin] = React.useState(false)
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

    /* React.useEffect(() => {
        fetch("./games/gamesList.json")
            .then((response) => response.json())
            .then((data) => {
                setAllGamesList(data)
                setUserGameList(data);
            });
    }, []); */

    React.useEffect(() => {
        setUserImage(userData.userImage);
        setUserName(userData.name);
        setUserFamily(userData.family);
        setUserToken(userData.api_token);
        (userData.is_admin) ? setUserAdmin(true) : setUserAdmin(false);

        fetch("https://dorsav2.dorsapackage.com/api/v1/gameList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_token: localStorage.getItem('uT'),
                req: 'gList'
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData) => {
                /*  console.info(responseData.data[1].score) */
                /* responseData.data[0].score = [0] */
                setAllGamesList(responseData.data)
                setUserGameList(responseData.data);
            });
    }, []);


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
                                <div key={index} className='w-100 text-end px-4 my-1 intItems' onClick={() => listFilter(index + 1)}>{val}</div>
                            )
                        })
                    }
                </div>
                <div className="mt-3 px-3 text-muted w-100 d-flex">
                    <div className='fas fa-sign-out settingIcons me-3' onClick={() => {
                        localStorage.clear()
                        setContentPage('login')
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
                    {(showAdminConfig) ? <AdminPanel hooshItems={hooshItems} setUserGameList={setUserGameList} setAllGamesList={setAllGamesList} /> : null}
                    <div className='flex-fill p-2 text-end' style={{ overflowY: 'auto' }}>
                        {
                            (userGameList.length != 0) ? <List gameList={userGameList} adminSit={userAdmin} setUserGameList={setUserGameList} setAllGamesList={setAllGamesList} /> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const MainContainer = () => {
    const [contentPage, setContentPage] = React.useState('login');
    const [userData, setUserData] = React.useState('');

    React.useEffect(() => {
        if (localStorage.getItem('uT') != null) {
            setUserData({
                name: localStorage.getItem('uN'),
                family: localStorage.getItem('uF'),
                userImage: localStorage.getItem('uI'),
                api_token: localStorage.getItem('uT'),
                is_admin: localStorage.getItem('uA')
            })
            setContentPage('profile')
        }
    }, [contentPage]);

    return (
        <div className={`widthChecker d-flex flex-column align-items-center ${(contentPage != 'login') ? 'userProfile py-3' : 'login py-2'}`}>
            {(contentPage == 'login') ? <LogIn setContentPage={setContentPage} setUserData={setUserData} /> : null}
            {(contentPage == 'profile') ? <UserProfile setContentPage={setContentPage} setUserData={setUserData} userData={userData} /> : null}
        </div>
    );
};

ReactDOM.render(
    <MainContainer />,
    document.getElementById('root')
);
