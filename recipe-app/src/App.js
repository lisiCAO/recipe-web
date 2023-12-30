// Desc: This is the main component of the application. It is responsible for rendering the Navbar and the Home or AdminPanel components depending on whether the user is logged in or not.
import React, { useContext, useState } from 'react';
import { UserContext } from './components/common/UserContext';
import Navbar from './components/layout/Navbar';
import LoginModal from './components/modals/LoginModal';
import Home from './views/Home';
import AdminPanel from './views/AdminPanel';
import UserProfile from './views/UserProfile';

function App() {

  const { currentPage, navigateTo, user, isLoggedIn, showLoginModal, setShowLoginModal, handleLogin, handleLogout } = useContext(UserContext);

  return (
      <div> 
        {/* render based on contion */}
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => setShowLoginModal(true)}
          navigateTo={navigateTo}
        />
        {/* switch pages */}
        {currentPage === 'home' && <Home navigateTo={navigateTo}/>}
        {currentPage === 'adminPanel' && <AdminPanel />}
        {currentPage === 'userProfile' && <UserProfile />}
        {/* display login modal */}
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
