import jwtDecode from 'jwt-decode';

export default function IsTokenExpired(token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
}
