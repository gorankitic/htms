
export const getCabins = async () => {
    const response = await fetch(`http://localhost:3000/api/cabins`, { credentials: "include" });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const createCabin = async (data) => {
    const { name, maxCapacity, regularPrice, discount, description, imageUrl } = data;

    const response = await fetch(`http://localhost:3000/api/cabins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, maxCapacity, regularPrice, discount, description, imageUrl })
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const editCabin = async (data, cabinId) => {
    const { name, maxCapacity, regularPrice, discount, description, imageUrl } = data;

    const response = await fetch(`http://localhost:3000/api/cabins/${cabinId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, maxCapacity, regularPrice, discount, description, imageUrl })
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const deleteCabin = async (cabinId) => {
    const response = await fetch(`http://localhost:3000/api/cabins/${cabinId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    });

    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }

    return response;
}