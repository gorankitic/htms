
export const getBookings = async () => {
    const response = await fetch(`http://localhost:3000/api/bookings`, { credentials: "include" });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}