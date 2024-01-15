<script setup lang="ts">
const props = defineProps<{
    tour: Tour,
    driver: Driver
}>()

// get all drivers located @ the tour's starting locationn
const supabase = useSupabaseClient()
const { data: availableDrivers } = await supabase
    .from('drivers')
    .select(`
        id,
        name,
        location
    `)
    .eq('location', props.tour.location_from)

async function updateAssignedDriver(driverId: number) {
    const { error } = await supabase
        .from('tours')
        .update({ assigned_driver_id: driverId })
        .eq('id', props.tour.id)
    
    if (error) {
        useToast().add({
            title: `An error occured: ${error.message}`,
            color: 'red'
        })
    } else {
        useToast().add({
            title: `Succesfully updated tour.`,
            color: 'primary'
        })
    }
}
</script>

<template>
    <USelect
        :modelValue="driver.id"
        @update:modelValue="updateAssignedDriver"
        :options="availableDrivers"
        optionAttribute="name"
        valueAttribute="id"
    />
</template>