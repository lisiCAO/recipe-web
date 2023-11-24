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
        const token = localStorage.getItem('token');
        if (token) {    
            setUser({ email: 'admin@email.com' });
            setIsLoggedIn(true);
        }
    }, []);

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
        setUser(response.user);           // 保存当前用户信息
      }, 2000);

    } catch (error) {
      // 处理登录失败的情况
      const jsonPart = error.message.split('HTTP error 401: ')[1]; // 从错误消息中提取出服务器返回的错误信息
      const errorData = JSON.parse(jsonPart);                      // 将错误信息转换为对象
      showMessage('error', 'Failed: ' + errorData.message);        // 显示错误消息
      setUser(null);                                        // 清空当前用户信息
    }
  };

  // 注销
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
};


    return (
        <UserContext.Provider value={{ user, isLoggedIn, showLoginModal, setShowLoginModal, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);