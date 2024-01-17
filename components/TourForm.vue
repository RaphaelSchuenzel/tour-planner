<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const props = defineProps<{
    tourId?: number
}>()

// form - input state
const state = reactive({
    customer_name: '',
    shipment_date: '',
    location_from: '',
    location_to: '',
    assigned_driver_id: '',
    availableDrivers: []
})

// form - validation
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.customer_name) errors.push({ path: 'customer_name', message: 'Required' })
    if (!state.shipment_date) errors.push({ path: 'shipment_date', message: 'Required' })
    if (!state.location_from) errors.push({ path: 'location_from', message: 'Required' })
    if (!state.location_to) errors.push({ path: 'location_to', message: 'Required' })
    if (!state.assigned_driver_id) errors.push({ path: 'assigned_driver_id', message: 'Required' })
    return errors
}

// provide supabase client for later use
const supabase = useSupabaseClient()

// access app-wide drivers state
const tours = useState<Array<Tour>>('tours')

// loading / submitting state
let isLoadingTourData = ref(false)
let isSubmittingTourData = ref(false)

async function getTourData() {
    isLoadingTourData.value = true

    const { data: tour, error } = await supabase
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
        .eq('id', props.tourId)
        .single()

    if (error) {
        useToast().add({
            title: `An error occured: ${error.message}`,
            color: 'red'
        })
    } else if (tour) {
        // get all drivers located @ the tour's starting locationn
        const { data: availableDrivers, error } = await supabase
            .from('drivers')
            .select(`
                id,
                name,
                location
            `)
            .eq('location', tour.location_from)

        if (error) {
            useToast().add({
                title: `An error occured: ${error.message}`,
                color: 'red'
            })
        } else if (availableDrivers) {
            state.customer_name = tour.customer_name
            state.shipment_date = tour.shipment_date
            state.location_from = tour.location_from
            state.location_to = tour.location_to
            state.assigned_driver_id = tour.drivers.id
            state.availableDrivers = availableDrivers
        }
    }

    isLoadingTourData.value = false
}

async function submitTourData(event: FormSubmitEvent<Tour>) {
    if (isLoadingTourData.value || isSubmittingTourData.value) return

    isSubmittingTourData.value = true

    const { data, error } = await supabase
        .from('tours')
        .upsert({
            id: props.tourId,
            customer_name: event.data.customer_name,
            shipment_date: event.data.shipment_date,
            location_from: event.data.location_from,
            location_to: event.data.location_to,
            assigned_driver_id: event.data.assigned_driver_id
        })
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
        .single()
    
    if (error) {
        useToast().add({
            title: `An error occured: ${error.message}`,
            color: 'red'
        })
    } else if (data) {        
        if (props.tourId) {
            tours.value = tours.value.map(tour => tour.id !== data.id ? tour : data)
        } else {
            tours.value.push(data)
        }
    }

    isSubmittingTourData.value = false
}

async function deleteTour() {
    if (isLoadingTourData.value || isSubmittingTourData.value) return

    const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', props.tourId)

    if (error) {
        useToast().add({
            title: `An error occured: ${error.message}`,
            color: 'red'
        })
    } else {
        tours.value = tours.value.filter(tour => { return tour.id != props.tourId })
    }
}

// get tour data if tour id is provided
if (props.tourId) getTourData()
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="submitTourData">
        <UFormGroup label="Customer Name" name="customer_name">
            <UInput
                v-model="state.customer_name"
                :loading="isLoadingTourData"
                :disabled="isLoadingTourData"
            />
        </UFormGroup>

        <UFormGroup label="Shipment Date" name="shipment_date">
            <UInput
                v-model="state.shipment_date"
                :loading="isLoadingTourData"
                :disabled="isLoadingTourData"
            />
        </UFormGroup>

        <UFormGroup label="Location from" name="location_from">
            <UInput
                v-model="state.location_from"
                :loading="isLoadingTourData"
                :disabled="isLoadingTourData"
            />
        </UFormGroup>

        <UFormGroup label="Location to" name="location_to">
            <UInput
                v-model="state.location_to"
                :loading="isLoadingTourData"
                :disabled="isLoadingTourData"
            />
        </UFormGroup>
        
        <UFormGroup label="Assigned Driver" name="assigned_driver">
            <USelect
                v-model="state.assigned_driver_id"
                :options="state.availableDrivers"
                optionAttribute="name"
                valueAttribute="id"
            />
        </UFormGroup>

        <UButton type="submit" block>
            <span v-if="tourId">Save</span>
            <span v-else>Create</span>
        </UButton>
    </UForm>

    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700" v-if="tourId">
        <UButton
            color="red"
            block
            @click="deleteTour"
        >
            Delete tour
        </UButton>
    </div>
</template>