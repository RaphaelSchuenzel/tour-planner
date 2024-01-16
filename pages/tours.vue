<script setup lang="ts">
// get all tours
let tours = useState<Array<Tour>>('tours')

await callOnce(async () => {
    const { data, error } = await useSupabaseClient()
        .from('tours')
        .select(`
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
        `)

    if (error) {
        useToast().add({
            title: `An error occured: ${error.message}`,
            color: 'red'
        })
    } else {
        tours.value = data;
    }
})

// table - set sort order
const tableSort = ref({
    column: 'shipment_date',
    direction: 'asc'
})

// table - specify columns to display
const tableColumns = [{
    key: 'customer_name',
    label: 'Customer Name',
    sortable: true
}, {
    key: 'shipment_date',
    label: 'Shipment Date',
    sortable: true
}, {
    key: 'location_from',
    label: 'Location from',
    sortable: true
}, {
    key: 'location_to',
    label: 'Location to',
    sortable: true
}, {
    key: 'drivers',
    label: 'Assigned Driver',
    sortable: true
}, {
    key: 'actions'
}]

const tableColumnActionItems = (tour: Tour) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => alert(`Edit: ${tour.id}`)
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => alert(`Delete: ${tour.id}`)
    }]
]
</script>

<template>
    <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
        <h1>Tours</h1>

        <UButton
            icon="i-heroicons-plus-20-solid"
            label="New Tour"
        />
    </div>

    <UContainer class="py-5">
        <UTable :sort="tableSort" :columns="tableColumns" :rows="tours">
            <template #drivers-data="{ row }">
                <DriverSelect :tour="row" :driver="row.drivers" />
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="tableColumnActionItems(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </UContainer>
</template>