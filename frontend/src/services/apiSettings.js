
export const getSettings = async () => {
    const response = await fetch(`http://localhost:3000/api/settings`, { credentials: "include" });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const updateSettings = async (data, settingsId) => {
    const response = await fetch(`http://localhost:3000/api/settings/${settingsId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}
