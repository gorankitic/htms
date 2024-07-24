
export const getBookings = async (filter, sortBy, page, limit) => {
    // Build query string from filter, sortBy and page
    let queryString = new URLSearchParams();
    if (filter) {
        queryString.append("status", filter);
    }
    queryString.append("sortBy", sortBy);
    queryString.append("page", page);
    queryString.append("limit", limit);
    queryString = queryString.toString();

    const response = await fetch(`http://localhost:3000/api/bookings?${queryString}`, { credentials: "include" });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}