// Desc: This is the main component of the application. It is responsible for rendering the Navbar and the Home or AdminPanel components depending on whether the user is logged in or not.
import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import LoginModal from './components/modals/LoginModal';
import Home from './views/Home';
import AdminPanel from './views/AdminPanel';
import ApiService from './services/ApiService';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 保存当前用户信息

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 可以选择调用ApiService.fetchCurrentUser()来获取用户信息
      setIsLoggedIn(true);
    }
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(prev => !prev);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await ApiService.login({ email, password });
      localStorage.setItem('token', response.token); // 保存token
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
      setCurrentUser(response.user); 
      console.log(response.user);
      // 设置用户信息等
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  
  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        userEmail={currentUser?.email}
        onLogout={handleLogout}
        onLoginClick={toggleLoginModal}
      />
      {isLoggedIn ? <AdminPanel /> : <Home />}
      {showLoginModal && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
          error={loginError}
        />
      )}
    </div>
  );
}

export default App;
