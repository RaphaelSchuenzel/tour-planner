export { Tour, Driver };

declare global {
    interface Tour {
        id: number
        customer_name: string
        shipment_date: date
        location_from: string
        location_to: string
        assigned_driver_id: number
    }

    interface Driver {
        id: number
        name: string
        location: string
    }
}