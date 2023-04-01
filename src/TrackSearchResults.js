import React from 'react';

export const TrackSearchResults = ({ track, chooseTrack }) => {
   
    // song selection from search result
    function handlePlay(song) {
        chooseTrack(song);
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePlay(track)}
        >
            <img
                src={track.albumUrl}
                style={{ width: '64px', height: '64px' }}
                alt={track.title}
            />
            <div className="ms-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    );
};
