import React from 'react';
import UserDetails from './../components/pages/regular/UserDetails';
import UserRecipesTable from '../components/pages/regular/UserRecipes';
import UserReviewsTable from './../components/pages/regular/UserReviewsTable';
import "./UserProfile.scss";

function UserProfile() {
    const [activeTab, setActiveTab] = React.useState('recipes');
    const [user] =React.useContext(UserContext);

    const renderComponent = () => {
        switch (activeTab) {
            case 'details':
                return <UserDetails />;
            case 'recipes':
                return <UserRecipes />;
            case 'reviews':
                return <UserReviews />;
            case 'favorites':
                return <UserFavorites />;
            default:
                return null;
        }
    };

    return (
        <div className="user-profile">
            <Sidebar setActiveTab={setActiveTab} category={user.category}/>
            <div className="content">
                {renderComponent()}
            </div>
        </div>
    );
}


export default UserProfile;
