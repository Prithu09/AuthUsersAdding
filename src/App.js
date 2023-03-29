import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

 


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const storeduserlogininformation = localStorage.getItem('IsLoggedIn','1');
    if(storeduserlogininformation === 1)
    {
      setIsLoggedIn(true);
    }
  },[])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('IsLoggedIn' , '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('IsLoggedIn');
  };

  return (

    <React.Fragment>
      <AuthContext.Provider value ={
        {
          isLoggedIn : isLoggedIn,
          onlogout : logoutHandler
        }
      }>
      <MainHeader  />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
