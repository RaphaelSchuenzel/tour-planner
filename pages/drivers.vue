<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: drivers } = await supabase
    .from('drivers')
    .select(`
        id,
        name,
        location
    `)

const tableColumns = [{
    key: 'name',
    label: 'Name'
}, {
    key: 'location',
    label: 'Location',
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
        <h1>Drivers</h1>

        <UButton
            icon="i-heroicons-plus-20-solid"
            label="New Driver"
        />
    </div>

    <UContainer class="py-5">
        <UTable :columns="tableColumns" :rows="drivers">
            <template #actions-data="{ row }">
                <UDropdown :items="tableColumnActionItems(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </UContainer>
</template>