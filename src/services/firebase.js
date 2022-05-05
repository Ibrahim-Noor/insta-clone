import { arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, limit, query, updateDoc, where } from "firebase/firestore"
import { firebase } from "../lib/firebase"
const DB = getFirestore(firebase);

export const doesUserNameExist = async username => {
    const q = query(collection(DB, 'users'), where('username', '==', username))
    const users = await getDocs(q);
    return users.docs.map(user=> user.data().length > 0);
}

export const getUserByUsername = async username => {
    const q = query(collection(DB, 'users'), where('username', '==', username))
    const users = await getDocs(q);

    return users.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
}

export const getUserByUserId = async userId => {
    const q = query(collection(DB, 'users'), where('userId', '==', userId))
    const users = await getDocs(q);

    const user = users.docs.map(user => ({
        ...user.data(),
        docId: user.id
    }))

    return user;
}

export const getUserSuggestionProfiles = async (userId, following) => {
    let suggestionUsersQuery = query(collection(DB, 'users'), limit(10));
    if (following.length) {
        suggestionUsersQuery = query(suggestionUsersQuery, where('userId', 'not-in', following)) 
    }
    const users = await getDocs(suggestionUsersQuery);
    const suggestionUsers = users.docs.map(user => ({
        ...user.data(),
        docId: user.id
    })).filter(user => user.userId !== userId)

    return suggestionUsers;
}

export const updateFollowingArray = async (userDocId, profileId, isFollowingProfile) => {
    const currentUserRef = doc(DB, 'users', userDocId);
    try {
        await updateDoc(currentUserRef, {
            following: isFollowingProfile? arrayRemove(profileId) : arrayUnion(profileId),
        })
    } catch (e) {
        console.log(e);
    }
}

export const updateFollowersArray = async (profileDocId, userId, isFollowedByUser) => {
    const followedProfileRef = doc(DB, 'users', profileDocId);
    try {
        await updateDoc(followedProfileRef, {
            followers: isFollowedByUser? arrayRemove(userId): arrayUnion(userId),
        })
    } catch (e) {
        console.log(e);
    }
}

export const getPhotos = async (userId, following) => {
    const q = query(collection(DB, 'photos'), where('userId', 'in', following))
    const photos = await getDocs(q);

    const userFollowedPhotos = photos.docs.map(photo => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async photo => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const user = await getUserByUserId(photo.userId);
 
            const { username } = user[0];
            return {username, ...photo, userLikedPhoto}
        })
    )

    return photosWithUserDetails;
}

export const handleLiked = async (liked, docId, userId) => {
    const photoRef = doc(DB, 'photos', docId);
    await updateDoc(photoRef, {
        likes: liked ? arrayUnion(userId): arrayRemove(userId) 
    })
} 

export const addComment = async (docId, displayName, comment) => {
    const photoRef = doc(DB, 'photos', docId);
    await updateDoc(photoRef, {
        comments: arrayUnion({displayName, comment})
    });
}

export const getUserPhotosByUsername = async (username) => {
    const [user] = await getUserByUsername(username);
    const q = query(collection(DB, 'photos'), where('userId', '==', user.userId));
    const response = await getDocs(q);

    return response.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
}