const tourSelect = `
    id,
    customer_name,
    shipment_date,
    location_from,
    location_to,
    drivers (
        id,
        name,
        location
    )
`

const driverSelect = `
    id,
    name,
    location
`

export { tourSelect, driverSelect }