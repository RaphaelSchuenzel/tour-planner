<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: tours } = await supabase.from('tours').select()
</script>

<template>
    <table>
        <tr>
            <th>Customer Name</th>
            <th>Shipment Date</th>
            <th>Location from</th>
            <th>Location to</th>
            <th>Assigned Driver</th>
        </tr>
        <tr v-for="tour in tours" :key="tour.id">
            <td>{{ tour.customer_name }}</td>
            <td>{{ tour.shipment_date }}</td>
            <td>{{ tour.location_from }}</td>
            <td>{{ tour.location_to }}</td>
            <td>{{ tour.assigned_driver_id }}</td>
        </tr>
    </table> 
</template>