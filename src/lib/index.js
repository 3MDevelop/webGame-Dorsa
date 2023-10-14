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

const UserProfile = ({ setUserLogin, userData }) => {
    const [userAdmin, setUserAdmin] = React.useState(false)
    const [userImage, setUserImage] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [userFamily, setUserFamily] = React.useState('')
    const [userToken, setUserToken] = React.useState('')

    const hooshItems = new Array(' منطقی ریاضی', 'دیداری فضایی', 'کلامی', 'موسیقایی', 'بدنی جنبشی', 'درون فردی', 'میان فردی', 'طبیعت گرا')

    const listFilter = (index) => {
        console.info(index)
    }

    React.useEffect(() => {
        setUserImage(userData.userImage)
        setUserName(userData.name)
        setUserFamily(userData.family)
        setUserToken(userData.token)
        if (userData.token == "H7LHrwwSdgF6sbXmCGnQBwJMuEAIPzWdtWHR2mJc") { setUserAdmin(true) } else { setUserAdmin(false) }
        setUserAdmin(true)
        console.info(userAdmin)
    }, [userData]);

    return (
        <div className='container-fluid p-0 m-0 w-100 h-100 d-flex flex-row-reverse'>
            <div id='profileSidebar' className='col-4 h-100 d-flex flex-column justify-content-between align-items-center py-2 overflow-hidden'>
                <img src={userImage} style={{ borderRadius: '50%' }} width='50%' className='mt-2 border border-2 border-info' />
                <div className='my-3  w-100 text-center'>{userName} {userFamily}</div>
                <div className='w-100 direction-rtl text-end px-3 text-muted'>فهرست بازی ها</div>
                {
                    hooshItems.map((val, index) => {
                        return (
                            <div className='w-100 text-end px-5 my-1' onClick={() => listFilter(index)}>هوش {val}</div>
                        )
                    })
                }
                <div className="mt-auto" onClick={() => setUserLogin(false)}>خروج از حساب کاربری</div>
            </div>
            <div className='col-8'>
                <div className='bg-white mx-3 h-100 border rounded-3 overflow-hidden p-3'>
                    list
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

/*     React.useEffect(() => {
        console.info(userData);
    }, [userData]);

 */    return (
        <div className={`d-flex flex-column align-items-center ${userLogin ? 'userProfile py-4' : 'login py-2'}`}>
            {userLogin ? <UserProfile setUserLogin={setUserLogin} setUserData={setUserData} userData={userData} /> : <LogIn setUserLogin={setUserLogin} setUserData={setUserData} />}
        </div>
    );
};

ReactDOM.render(
    <MainContainer />,
    document.getElementById('root')
);
