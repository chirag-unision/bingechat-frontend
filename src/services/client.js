

const API_BASE_URL = 'https://manan.gitroaster.tech/api/v1';
const API_BASE_URL_WS = 'wss://manan.gitroaster.tech/api/v1';

const renewAccessToken = async () =>{
    const refToken = localStorage.getItem("refToken");
    if(refToken == null) return false;
    return await fetch(API_BASE_URL+'/user/token?refresh_token='+refToken, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success: 123', data);
        if(data.data && data.data.access_token) localStorage.setItem("accessToken",data.data.access_token);
        else return 0;
        return 1;
    })
    .catch((error) => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refToken")
        localStorage.removeItem("username")
        localStorage.removeItem("userVerificationStatus")
        console.error('Error:', error);
        return 0;
    });
}

export { API_BASE_URL, API_BASE_URL_WS,renewAccessToken };