<script setup lang="ts">
// get all drivers
let drivers = useState<Array<Driver>>('drivers')

await callOnce(async () => {
    const { data, error } = await useSupabaseClient()
        .from('drivers')
        .select(driverSelect)
        .order('id', { ascending: true })

    if (error) return errorToast(error.message)
    
    if (data) drivers.value = data
})

// table - specify columns to display
const tableColumns = [{
    key: 'name',
    label: 'Name'
}, {
    key: 'location',
    label: 'Location',
    sortable: true
}, {
    key: 'edit'
}]
</script>

<template>
    <NuxtPage />

    <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
        <h1>Drivers</h1>
        
        <NuxtLink to="/drivers/new">
            <UButton
                icon="i-heroicons-plus-20-solid"
                label="New Driver"
            />
        </NuxtLink>
    </div>

    <div class="scroll-container">
        <UContainer class="scroll-container py-5">
            <UTable :columns="tableColumns" :rows="drivers">
                <template #edit-data="{ row }">
                    <NuxtLink :to="`/drivers/${row.id}`">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-pencil-square-20-solid"
                        />
                    </NuxtLink>
                </template>
            </UTable>
        </UContainer>
    </div>
</template>