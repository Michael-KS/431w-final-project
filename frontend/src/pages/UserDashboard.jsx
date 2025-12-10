import React, {useState} from "react";
import './UserDashboard.css'

const ProfileTabContent = () =>(
    <div>
        <h3>Profile Settings</h3>
    </div>
);

const ActivitiesTabContent = () =>(
    <div>
        <h3>Activities</h3>
    </div>
)

const EventTabContent = () => (
    <div>
        <h3>Events</h3>
    </div>
)

const ReviewTabContent = () => (
    <div>
        <h3>Reviews</h3>
    </div>
)

const TopTenTabContent = () => (
    <div>
        <h3>Top10</h3>
    </div>
)

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderTabContent = () => {
        if(activeTab === 'activities'){
            return <ActivitiesTabContent/>;
        } else if(activeTab === 'events'){
            return <EventTabContent/>;
        } else if(activeTab === 'reviews'){
            return <ReviewTabContent/>;
        } else if(activeTab === 'top'){
            return <TopTenTabContent/>;
        }
        return <ProfileTabContent/>;

    };

    return (
        <div className="tabs">
            <h1>User Dashboard</h1>

            <div className="tab-nav">
                <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
                >Profile</button>
                <button
                className={activeTab === 'activities' ? 'active' : ''}
                onClick={() => setActiveTab('activities')}
                >Activities</button>
                <button
                className={activeTab === 'events' ? 'active' : ''}
                onClick={() => setActiveTab('events')}
                >Events</button>
                <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
                >Reviews</button>
                <button
                className={activeTab === 'top' ? 'active' : ''}
                onClick={() => setActiveTab('top')}
                >Top10</button>
                </div>
                <div className="tab-content">
                    {renderTabContent()}</div></div>
    );
}

export default UserDashboard;