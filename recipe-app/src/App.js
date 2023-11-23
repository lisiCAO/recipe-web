// Desc: This is the main component of the application. It is responsible for rendering the Navbar and the Home or AdminPanel components depending on whether the user is logged in or not.
import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from './components/common/MessageContext';
import Navbar from './components/layout/Navbar';
import LoginModal from './components/modals/LoginModal';
import Home from './views/Home';
import AdminPanel from './views/AdminPanel';
import ApiService from './services/ApiService';
import { MessageContext } from './components/common/MessageContext';
import { UserContext, UserProvider} from './components/common/UserContext';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);            // 保存用户是否登录的状态
  const [showLoginModal, setShowLoginModal] = useState(false);    // 保存是否显示登录模态框的状态
  const [currentUser, setCurrentUser] = useState(null);           // 保存当前用户信息
  const { showMessage } = useContext(MessageContext);             // 保存消息提示的方法
  const { user, setUser } = useContext(UserContext);
  
  useEffect(() => {

      // 检查用户是否已经登录
    const token = localStorage.getItem('token');
    if (token) {
      // 可以选择调用ApiService.fetchCurrentUser()来获取用户信息
      setIsLoggedIn(true);
    }
  }, []);

  // 切换登录模态框的显示状态
  const toggleLoginModal = () => {
    setShowLoginModal(prev => !prev); // 通过取反来切换状态
  };

  // 处理登录
  const handleLogin = async (email, password) => {
    try {
      const response = await ApiService.login({ email, password }); // 调用登录接口
      localStorage.setItem('token', response.token);                // 保存token
      
      showMessage('success', 'Login successful')                    // 显示登录成功的消息
      // 模拟延迟
      setTimeout(()=>{
        setIsLoggedIn(true);              // 设置用户已经登录
        setShowLoginModal(false);         // 关闭登录模态框
        setCurrentUser(response.user);    // 保存当前用户信息
      }, 2000);

    } catch (error) {
      // 处理登录失败的情况
      const jsonPart = error.message.split('HTTP error 401: ')[1]; // 从错误消息中提取出服务器返回的错误信息
      const errorData = JSON.parse(jsonPart);                      // 将错误信息转换为对象
      showMessage('error', 'Failed: ' + errorData.message);        // 显示错误消息
      setCurrentUser(null);                                        // 清空当前用户信息
    }
  };

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem('token'); // 删除token
    setIsLoggedIn(false);             // 设置用户未登录
    setCurrentUser(null);             // 清空当前用户信息
  };
  
  return (
      <div> 
        {/* 通过条件渲染来决定显示哪个组件 */}
        <Navbar
          isLoggedIn={isLoggedIn}
          userEmail={currentUser?.email}
          onLogout={handleLogout}
          onLoginClick={toggleLoginModal}
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
