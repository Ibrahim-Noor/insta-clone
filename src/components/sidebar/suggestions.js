import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserSuggestionProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';
import Skeleton from 'react-loading-skeleton';

const Suggestions = ({userId, following, docId}) => {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        const getSuggestionProfiles = async () =>{
            const users = await getUserSuggestionProfiles(userId, following)
            setProfiles(users);
        }
        if (userId) {
            getSuggestionProfiles();
        }
    }, [following, userId])
    return !profiles? <Skeleton count={3} height={80} className='mt-5' /> :
        profiles.length ? <div className='rounded flex flex-col'>
            <div className='text-sm flex items-center align-items justify-between mb-2'>
              <p className='font-bold text-gray-base'>Suggestions for you</p>  
            </div>
            <div className='mt-4 grid gap-5'>
                {profiles.map(profile => (
                <SuggestedProfile
                    key={profile.docId}
                    profileDocId={profile.docId}
                    username={profile.username}
                    profileId={profile.userId}
                    userId={userId}
                    userDocId={docId}
                    />))
                }
            </div>
        </div>:null
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    followings: PropTypes.array,
}

export default Suggestions
