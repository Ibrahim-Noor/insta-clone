import React, {useState} from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowersArray, updateFollowingArray } from '../../services/firebase';

const SuggestedProfile = ({profileDocId, username, profileId, userId, userDocId}) => {
    const [followed, setFollowed] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const handleFollow = () => {
        setDisabled(true);
        updateFollowingArray(userDocId, profileId).then(
            () => updateFollowersArray(profileDocId, userId)).then(
                () => {
                    setFollowed(true);
                    setDisabled(false);
                }
            )
    } 

    return !followed? (
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex items-center justify-between'>
                <img 
                    className='rounded-full w-8 h-8 flex mr-3 object-center object-cover'
                    src={`/images/avatars/${username}.jpg`}
                    alt='avatar'
                />
                <Link to={`/p/${username}`}>
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
            <button
                className='text-xs font-bold text-blue-medium'
                type='button'
                disabled={disabled}
                onClick={handleFollow}
            >Follow</button>
        </div>
    ): null
}


SuggestedProfile.protoTypes = {
    userDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
}

export default SuggestedProfile;
