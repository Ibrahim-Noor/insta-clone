import React, { memo } from 'react'
import useUser from '../../hooks/use-user';
import User from './user.js'
import Suggestions from './suggestions.js';

const Sidebar = () => {
    const {user: {docId, fullName, username, userId, following}} = useUser();
    return (
        <div>
            <User fullName={fullName} username={username}/>
            <Suggestions userId={userId} following={following} docId={docId}/>
        </div>
    )
}

export default Sidebar;

// Sidebar.whyDidYouRender=true;