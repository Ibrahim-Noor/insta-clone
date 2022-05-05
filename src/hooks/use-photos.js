import UserContext from "../context/user";
import { useEffect, useState, useContext } from 'react'
import { getPhotos, getUserByUserId } from "../services/firebase";

const UsePhotos = () => {
    const [photos, setPhotos] = useState(null);
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext)
 
    useEffect(() => {
        const getTimelinePhotos = async () => {
            const [{following}] = await getUserByUserId(userId);
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following); 
            }

            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);

        }

        getTimelinePhotos();
    }, [userId]);

    return {photos}
}

export default UsePhotos
