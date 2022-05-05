import React from 'react'
import Skeleton from 'react-loading-skeleton';
import UsePhotos from '../hooks/use-photos'
import Post from './post';

const Timeline = () => {
    const { photos } = UsePhotos();
    return (
        <div className='container col-span-2'>
            {!photos ? (
                <Skeleton count={4} width='100%' height={400} className='mb-5' />
            ) : photos?.length > 0 ? (
                photos.map(content => <Post key={content.docId} content={content}></Post>)
            ) : <p className='text-center text-2xl'>Follow people to see photos!!</p>
            }
        </div>
    )
}

export default Timeline
