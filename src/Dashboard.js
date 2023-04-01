import React, { useState } from 'react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Container, Form } from 'react-bootstrap';
import { TrackSearchResults } from './TrackSearchResults';
import { Player } from './Player';

const spotifyApi = new SpotifyWebApi();

export const Dashboard = ({ accessToken }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    // choosing the track to play
    function chooseTrack(track) {
        if (!track) return;
        setPlayingTrack(track);
        setSearch('');
    }

    // hook for setting access token
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken); // setting access token each time it expires
    }, [accessToken]);

    //hook for fetching search results
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancelPreviousSearch = false;
        spotifyApi.searchTracks(search).then((res) => {
            if (cancelPreviousSearch) return;
            if (!res) return setSearchResults([]);
            setSearchResults(
                res.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (smallest.height < image.height) return smallest;
                            return image;
                        },
                        track.album.images[0]
                    );

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                        bigImageUrl: track.album.images[0].url,
                        previewurl: track.preview_url,
                    };
                })
            );
        });
        return () => {
            cancelPreviousSearch = true;
        };
    }, [accessToken, search]);

    return (
        <Container
            className="d-flex flex-column py-2"
            style={{ minHeight: '100vh' }}
        >
            <Form.Control
                type="search"
                placeholder="Search Songs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div
                className="flex-grow-1 my-2"
                style={{ overflowY: 'auto', maxHeight: '81vh' }}
            >
                {searchResults.length > 0 &&
                    searchResults.map((track) => (
                        <TrackSearchResults
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))}
                {searchResults.length === 0 && playingTrack && (
                    <div className="text-center" style={{ whiteSpace: 'pre' }}>
                        <img
                            src={playingTrack?.bigImageUrl}
                            alt={playingTrack?.track}
                            style={{ width: '640px', height: '640px' }}
                        />
                    </div>
                )}
            </div>
            <div className="play-recorder">
                <Player accessToken={accessToken} trackUri={playingTrack} />
            </div>
        </Container>
    );
};
