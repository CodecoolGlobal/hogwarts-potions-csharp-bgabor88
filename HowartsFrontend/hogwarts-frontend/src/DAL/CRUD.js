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

async function apiPut(url, dataToUpdate) {
    const update = await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: dataToUpdate.name})
    });
    return update;
};

async function apiDelete(url) {
    const requestDelete = await fetch(url, {
        method: "DELETE"
    })
    return await requestDelete.success;
};

export {apiGet, apiPost, apiPut, apiDelete};