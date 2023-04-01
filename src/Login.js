import { Button, Container } from 'react-bootstrap';
import React from 'react';
import { CLIENT_ID } from './environment';

// this client id u'll get once u login in https://developer.spotify.com/
const clientId = CLIENT_ID;
const responseType = 'token';
const scope = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
].join('%20');
const redirectUri = 'http://localhost:3000';
const spotifyUrl = 'https://accounts.spotify.com/authorize?';
const API_URL = `${spotifyUrl}&client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
const btnColor = 'outline-info';

export const Login = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Button href={API_URL} size="lg" variant={btnColor}>
                Login with spotify
            </Button>
        </Container>
    );
};
