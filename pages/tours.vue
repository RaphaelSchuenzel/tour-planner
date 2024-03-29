<script setup lang="ts">
// get all tours
let tours = useState<Array<Tour>>('tours')

await callOnce(async () => {
    const { data, error } = await useSupabaseClient()
        .from('tours')
        .select(tourSelect)
        .order('id', { ascending: true })

    if (error) return errorToast(error.message)
    
    if (data) tours.value = data
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
    key: 'edit'
}]
</script>

<template>
    <NuxtPage />

    <div class="flex justify-end items-center px-5 h-16 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
        <NuxtLink to="/tours/new" class="flex w-full xl:w-max">
            <UButton
                class="flex-1 justify-center xl:w-unset xl:justify-start"
                icon="i-heroicons-plus-20-solid"
                label="New Tour"
            />
        </NuxtLink>
    </div>

    <div class="h-[calc(100vh-8rem)] xl:h-[calc(100vh-4rem)] overflow-y-auto">
        <UContainer class="xl:py-5">
            <UTable :sort="tableSort" :columns="tableColumns" :rows="tours">
                <template #drivers-data="{ row }">
                    <ULink
                        :to="`/drivers/${row.drivers.id}`"
                        active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >{{ row.drivers.name }}</ULink>
                </template>

                <template #edit-data="{ row }">
                    <NuxtLink :to="`/tours/${row.id}`">
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