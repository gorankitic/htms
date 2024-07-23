
export const getBookings = async (filter, sortBy) => {
    // Build query string from filter and sortBy
    let queryString = new URLSearchParams();
    if (filter) {
        queryString.append("status", filter);
    }
    queryString.append("sortBy", sortBy);
    queryString = queryString.toString();

    const response = await fetch(`http://localhost:3000/api/bookings?${queryString}`, { credentials: "include" });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}