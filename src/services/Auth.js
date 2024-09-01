import { API_BASE_URL } from './client';

const loginApi = async (jsonData) => {
    console.log(JSON.stringify(jsonData))
    return await fetch(API_BASE_URL+'/user/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });

}

const register = async (jsonData) => {

    return await fetch(API_BASE_URL+'/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });

}

const getColleges = async () => {

    return await fetch(API_BASE_URL+'/college', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });

}

const forget_pass = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/password-reset/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}

const forget_pass_confirm = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/password-reset/confirm/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}

const verify_user = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}

const google_auth_init = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/google', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}
const google_auth_final = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}

const checkUserVerificationStatus = async () => {
    if(localStorage.getItem('accessToken') == null){
        return false
    }
    return await fetch(API_BASE_URL+'/user/verify', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if(data.status_code = 200){
            return true
        }else return false
    })
    .catch((error) => {
        console.error('Error:', error);
        return false
    });
}


export { loginApi, register, getColleges, forget_pass, forget_pass_confirm, verify_user, google_auth_final, google_auth_init , checkUserVerificationStatus};