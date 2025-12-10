import React, {useState} from "react";
import './UserDashboard.css'

const ProfileTabContent = () =>(
    <div>
        <h3>Profiles</h3>
    </div>
);


const CategoriesTabContent = () =>(
    <div>
        <h3>Categories</h3>
    </div>
);

const InterestsTabContent = () =>(
    <div>
        <h3>Interests</h3>
    </div>
);


const ActivitiesTabContent = () =>(
    <div>
        <h3>Activities</h3>
    </div>
)





function AdminLandingPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderTabContent = () => {
        if(activeTab === 'activities'){
            return <ActivitiesTabContent/>;
        } else if(activeTab === 'categories'){
            return <CategoriesTabContent/>;
        } else if(activeTab === 'interests'){
            return <InterestsTabContent/>;
        } 
        return <ProfileTabContent/>;

    };

    return (
        <div className="tabs">
            <h1>Admin Landing Page</h1>

            <div className="tab-nav">
                <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
                >Profile</button>
                <button
                className={activeTab === 'categories' ? 'active' : ''}
                onClick={() => setActiveTab('categories')}
                >Categories</button>
                <button
                className={activeTab === 'interests' ? 'active' : ''}
                onClick={() => setActiveTab('interests')}
                >Interests</button>
                <button
                className={activeTab === 'activities' ? 'active' : ''}
                onClick={() => setActiveTab('activities')}
                >Activities</button>
                </div>
                <div className="tab-content">
                    {renderTabContent()}</div></div>
    );
}

export default AdminLandingPage;