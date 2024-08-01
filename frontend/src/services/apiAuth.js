
export const login = async ({ email, password }) => {
    // The Fetch API does not throw an error for HTTP error statuses (e.g., 400 or 500). 
    // Check response.ok to handle this server errors when the promise gets resolved
    // The Fetch API rejects the promise if there's a network error or if the request is aborted, or CORS errors
    const response = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const logout = async () => {
    const response = await fetch('http://localhost:3000/api/users/logout', { credentials: 'include' });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const signup = async ({ name, email, password }) => {
    // The Fetch API does not throw an error for HTTP error statuses (e.g., 400 or 500). 
    // Check response.ok to handle this server errors when the promise gets resolved
    // The Fetch API rejects the promise if there's a network error or if the request is aborted, or CORS errors
    const response = await fetch(`http://localhost:3000/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}
