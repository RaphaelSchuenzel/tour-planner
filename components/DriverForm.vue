<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const props = defineProps<{
    driverId?: number
}>()

// form - input state
const state = reactive({
    name: '',
    location: ''
})

// form - validation
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Required' })
    if (!state.location) errors.push({ path: 'location', message: 'Required' })
    return errors
}

// provide supabase client for later use
const supabase = useSupabaseClient()

// access app-wide drivers state
const drivers = useState<Array<Driver>>('drivers')

// loading / submitting state
let isLoadingDriverData = ref(false)
let isSubmittingDriverData = ref(false)

async function getDriverData() {
    isLoadingDriverData.value = true

    const { data, error } = await supabase
        .from('drivers')
        .select(driverSelect)
        .eq('id', props.driverId)
        .single()

    if (error) {
        errorToast(error.message)
    } else if (data) {
        state.name = data.name
        state.location = data.location
    }

    isLoadingDriverData.value = false
}

async function submitDriverData(event: FormSubmitEvent<Driver>) {
    if (isLoadingDriverData.value || isSubmittingDriverData.value) return

    isSubmittingDriverData.value = true

    const upsertData: Driver = {
        id: props.driverId ? props.driverId : undefined,
        name: event.data.name,
        location: event.data.location
    }

    const { data, error } = await supabase
        .from('drivers')
        .upsert(upsertData, { onConflict: 'id' })
        .select(driverSelect)
        .single()

    if (error) {
        return errorToast(error.message)
    } else if (data) {
        if (props.driverId) {
            drivers.value = drivers.value.map(driver => driver.id !== data.id ? driver : data)
        } else {
            drivers.value.push(data)
        }
    }

    isSubmittingDriverData.value = false
}

async function deleteDriverAccount() {
    if (isLoadingDriverData.value || isSubmittingDriverData.value) return

    const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', props.driverId)

    if (error) return errorToast(error.message)
    
    drivers.value = drivers.value.filter(driver => { return driver.id != props.driverId })
}

// get driver data if driver id is provided
if (props.driverId) getDriverData()
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="submitDriverData">
        <UFormGroup label="Name" name="name">
            <UInput
                v-model="state.name"
                :loading="isLoadingDriverData"
                :disabled="isLoadingDriverData"
            />
        </UFormGroup>

        <UFormGroup label="Location" name="location">
            <UInput
                v-model="state.location"
                :loading="isLoadingDriverData"
                :disabled="isLoadingDriverData"
            />
        </UFormGroup>

        <UButton type="submit" block>
            <span v-if="driverId">Save</span>
            <span v-else>Create</span>
        </UButton>
    </UForm>

    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700" v-if="driverId">
        <UButton
            color="red"
            block
            @click="deleteDriverAccount"
        >
            Delete account
        </UButton>
    </div>
</template>