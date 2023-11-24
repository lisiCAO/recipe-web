// Desc: This is the main component of the application. It is responsible for rendering the Navbar and the Home or AdminPanel components depending on whether the user is logged in or not.
import React, { useState, useContext } from 'react';
import { UserContext } from './components/common/UserContext';
import Navbar from './components/layout/Navbar';
import LoginModal from './components/modals/LoginModal';
import Home from './views/Home';
import AdminPanel from './views/AdminPanel';

function App() {

  const { user, isLoggedIn, showLoginModal, setShowLoginModal, handleLogin, handleLogout } = useContext(UserContext);
 
  return (
      <div> 
        {/* 通过条件渲染来决定显示哪个组件 */}
        <Navbar
          isLoggedIn={isLoggedIn}
          userEmail={user?.email}
          onLogout={handleLogout}
          onLoginClick={() => setShowLoginModal(true)}
        />
        {/* 根据用户是否登录来决定显示Home组件还是AdminPanel组件 */}
        {isLoggedIn ? <AdminPanel /> : <Home />} 
        {/* 显示登录模态框 */}
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
