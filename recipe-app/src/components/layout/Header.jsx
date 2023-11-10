import React from 'react';
import './Header.css'; 
import Button from '../common/Button'; // 导入Button组件

const Header =  ({userEmail}) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn); // 切换登录状态
    };

    const navigate = (path) => {
        setIsLoggedIn(false); // 切换登录状态
    };


    return (
        <header className="header">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/food-logo-design-10.png" alt="logo" className="logo-img" />
            </div>
            <div className="title">
                <h1>Recipe App</h1>
            </div>
            <div className="navigation">
                {isLoggedIn ? (
                    <>
                        {/* 这里可导航到管理面板的链接或按钮 */}
                        <span className="welcome-message" onClick={()=>navigate('//admin')}>
                            Welcome, {userEmail}
                            </span>
                        
                        <Button onClick={handleLoginLogout} variant="secondary">
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleLoginLogout} variant="primary">
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
};


export default Header;
