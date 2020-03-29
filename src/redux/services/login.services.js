// import config from 'config';
export const loginService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Client-ID': process.env.REACT_APP_API_CLIENT,
            'Client-Secret': process.env.REACT_APP_API_SECRET,
            'Accept': '*/*'
        },
        body: JSON.stringify({ username, password }),
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}v1/auth/get-access-token`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.authentication.user));
            localStorage.setItem('access_token', JSON.stringify(response.data.authentication.access_token));
            return response;
        });
}

function logout() {
    //remove use
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}