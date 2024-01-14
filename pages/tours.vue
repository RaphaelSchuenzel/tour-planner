<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: tours } = await supabase
    .from('tours')
    .select(`
        id,
        customer_name,
        shipment_date,
        location_from,
        location_to,
        drivers (
            id,
            name
        )
    `)
    
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
    key: 'drivers.name',
    label: 'Assigned Driver',
    sortable: true
}, {
    key: 'actions'
}]

const tableColumnActionItems = (row: any) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => alert(`Edit: ${row.id}`)
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => alert(`Delete: ${row.id}`)
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
        <UTable :columns="tableColumns" :rows="tours">
            <template #actions-data="{ row }">
                <UDropdown :items="tableColumnActionItems(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </UContainer>
</template>