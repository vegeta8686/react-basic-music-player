import React from 'react';

export const Player = ({ accessToken, trackUri }) => {
    if (!trackUri || !accessToken) return;
    return (
        <div className="audio-player">
            <audio
                controls
                src={trackUri?.previewurl}
                typeof="audio/mp3"
                autoPlay
            />
        </div>
    );
};
