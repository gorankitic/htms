import React from 'react'

const UpdateSettingsForm = () => {
    return (
        <form>
            <input type="number" id="booking-length" />
            <input type="number" id="max-guests" />
            <input type="number" id="breakfast-price" />
        </form>
    )
}

export default UpdateSettingsForm;