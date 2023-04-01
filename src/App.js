import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Login';
import { Dashboard } from './Dashboard';

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = parts[1];
            return initial;
        }, {});
};

function App() {
    const accessToken = getTokenFromUrl().access_token;
    return accessToken ? <Dashboard accessToken={accessToken} /> : <Login />;
}

export default App;
