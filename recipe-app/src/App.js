// Desc: This is the main component of the application. It is responsible for rendering the Navbar and the Home or AdminPanel components depending on whether the user is logged in or not.
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './components/layout/Navbar';
import LoginModal from './components/modals/LoginModal';
import Home from './views/Home';
import AdminPanel from './views/AdminPanel';
import ApiService from './services/ApiService';
import { MessageContext } from './components/common/MessageContext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 保存当前用户信息
  const { showMessage } = useContext(MessageContext);
  
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
      showMessage('success', 'Login successful')
      setTimeout(()=>{
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setCurrentUser(response.user); 
      }, 2000);
    // 设置用户信息等
    } catch (error) {
      const jsonPart = error.message.split('HTTP error 401: ')[1];
      const errorData = JSON.parse(jsonPart);
      showMessage('error', 'Failed: ' + errorData.message);
      setCurrentUser(null);
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
          />
        )}
      </div>
  );
}

export default App;
