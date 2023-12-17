import { createContext, useState, useContext, useEffect } from 'react';
import { MessageContext } from './MessageContext';
import ApiService from '../../services/ApiService';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] =useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); // 管理登录模态框状态
    const { showMessage } = useContext(MessageContext);             // 保存消息提示的方法
    useEffect(() =>{
        const checkLoginStatus = async () => {
          try {
            const response = await ApiService.fetchCurrentUser();
            console.log(response);
            setIsLoggedIn(true);
            setUser(response);
          } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
          }
        };
        checkLoginStatus();
    }, []);

  // 处理登录
  const handleLogin = async (email, password) => {
    try {
      const response = await ApiService.login({ email, password });
      console.log('handle Login:' +response);
      showMessage('success', 'Login successful');
      // 模拟延迟
      setTimeout(() => {
        setIsLoggedIn(true);           // 设置用户已经登录
        setShowLoginModal(false);      // 关闭登录模态框
        setUser(response.user);        // 保存当前用户信息
      }, 2000);
  
    } catch (error) {
      // 处理登录失败的情况
      showMessage('error', 'Failed to login');
      setUser(null); // 清空当前用户信息
    }
  };
  

  // 注销
  const handleLogout = async () => {
    try {
      // 发送请求到后端以清除 JWT Cookie
      await ApiService.logout(); // 确保您有一个处理注销的后端路由
      setIsLoggedIn(false);
      setUser(null);
      showMessage('success', 'Logged out successfully');
    } catch (error) {
      showMessage('error', 'Failed to log out');
    }
  };
  


    return (
        <UserContext.Provider value={{ user, isLoggedIn, showLoginModal, setShowLoginModal, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);