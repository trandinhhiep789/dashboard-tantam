

export const postData = async (url = '', data = {}) => {
    // Default options are marked with *
    // const response = await fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    // });
    try {
        let response = await fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            withCredentials: true,
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'

            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log(error.message);
        return {
            IsError: true,
            Message: 'Lỗi gọi API: không kết nối được với máy chủ',
            MessageDetail: error.message == 'Network request failed' ? `[${error.message}], Vui lòng kiểm tra tình trạng mạng!` : error.message,
        }
        // throw new Error(error.message);
    }
}

export const postDataWithAuthenHeader = async (url, data, authenHeader) => {
    try {
        let _header = {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'Access-Control-Allow-Origin': '*',
            'ClientID': authenHeader.clientID,
            'AuthenData': authenHeader.authenData
        }
        if (!(data instanceof FormData)) {
            _header['Content-Type'] = 'application/json';
            data = JSON.stringify(data)
        }

        let response = await fetch(url, {
            body: data, // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            withCredentials: true,
            headers: _header,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        let responseJson
        if (response.status == 200) {
            responseJson = await response.json();
        }
        else {
            const tempt = await response.json();
            console.log(response.status, "==>", tempt)
            // console.log(tempt)
            responseJson = {
                IsError: true,
                StatusID: response.status,
                Message: JSON.stringify(tempt),
                MessageDetail: JSON.stringify(tempt),
            }
        }
        return responseJson
        // return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log(error.status, "==>", error.message);
        return {
            IsError: true,
            Message: 'Lỗi gọi API: không kết nối được với máy chủ',
            MessageDetail: error.message == 'Network request failed' ? `[${error.message}], Vui lòng kiểm tra tình trạng mạng!` : error.message,
        }
        // throw new Error(error.message);
    }
    // let responseJson
    // // console.log(response.json())
    // if (response.status == 200) {
    //     responseJson = await response.json();
    // }
    // else {
    //     const tempt = await response.json();
    //     // console.log(tempt)
    //     responseJson = {
    //         IsError: true,
    //         StatusID: response.status,
    //         Message: JSON.stringify(tempt),
    //         MessageDetail: JSON.stringify(tempt),
    //     }
    // }
    // return responseJson
    // } catch (error) {
    //     console.log(error.message);
    //     throw new Error(error.message);
    // }
}

export const getToken = async () => {
    try {
        const response = await fetch(API_HOST_LIST["XPOSAPI"].TOKENURL, {
            "headers": {
                "accept": "application/json",
                "authorization": "Basic bXdnLXRtcy1hcHAtYXBpOnhjeDMwY21zZDEyNzBw",
                "content-type": "application/x-www-form-urlencoded"
            },
            "body": "grant_type=client_credentials",
            "method": "POST"
        })
        let responseJson = await response.json();
        return responseJson
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
}

export const getVoucherXpos = async (data) => {
    try {
        let responseJson
        const token = await getToken()
        if (!!token && !!token.access_token) {
            const response = await fetch(API_HOST_LIST["XPOSAPI"].XPOSURL,
                {
                    method: "POST",
                    headers: {
                        "authorization": `Bearer ${token.access_token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )
            responseJson = await response.json();
        }
        return responseJson
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
}
