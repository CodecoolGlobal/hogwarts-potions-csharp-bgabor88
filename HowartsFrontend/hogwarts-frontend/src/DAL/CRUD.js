async function apiGet(url) {
    const data = await fetch(url);
    const result = await data.json();
    return result;
};

async function apiPost(url, registrationData) {
    const send = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    });
    return await send.json();
};

async function apiPut(url) {
    const update = await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    return await update.json();
};

async function apiDelete(url) {
    const requestDelete = await fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return requestDelete;
};

export {apiGet, apiPost, apiPut, apiDelete};