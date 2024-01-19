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

    <div class="flex justify-end items-center px-5 h-16 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
        <NuxtLink to="/drivers/new" class="flex w-full xl:w-max">
            <UButton
                class="flex-1 justify-center xl:w-unset xl:justify-start"
                icon="i-heroicons-plus-20-solid"
                label="New Driver"
            />
        </NuxtLink>
    </div>

    <div class="h-[calc(100vh-8rem)] xl:h-[calc(100vh-4rem)] overflow-y-auto">
        <UContainer class="xl:py-5">
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