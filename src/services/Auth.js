import { API_BASE_URL, renewAccessToken } from './client';

const handleError = async (error) =>{
    if(error.status == 401) {
        const res = await renewAccessToken();
        return [res,error]
    }
    return [2,error];
}

/*
Usage of handleError for secure endpoints

.catch((error) => {
    console.error('Error:', error);
    return handleError(error.data)
}).then(res =>{
    if(res[0] ==2) return res[1];
    if(res[0] == 1) return api_call_function(jsonData);
    //logout user otherwise;
})
*/

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

const sendReport = async (jsonData) => {

    return await fetch(API_BASE_URL+'/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
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
        if(data.status_code == 200){
            return true
        }else return false
    })
    .catch((error) => {
        console.error('Error:', error);
        return false
    });
}

const verifyAccessToken = async ()=>{
    try{
    return await fetch(API_BASE_URL+'/user/token', {
        method: 'HEAD',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return handleError(data)
    })
    .catch((error) => {
        console.error('Error:', error);
        return handleError(error)
    }).then(res =>{
        if(res[0] ==2) return true;
        if(res[0] == 1){
            console.log("Calling accessToken verify again")
            return verifyAccessToken(jsonData);
        };
        return false
    })
    }catch (error){
        console.log(error)
        return await handleError({status:401})
    }

}


export { loginApi, register, getColleges, sendReport, forget_pass, forget_pass_confirm, verify_user, google_auth_final, google_auth_init , checkUserVerificationStatus, verifyAccessToken};