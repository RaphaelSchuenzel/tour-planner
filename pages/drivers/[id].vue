<script setup lang="ts">
const router = useRouter()

let isValidRoute = ref(false)
let isShowSlideover = ref(true)

function closeSlideover () {
    router.push({ path: '/drivers' })
}

// check if route is valid (id should be a number)
onBeforeMount(() => {
    const route = useRoute()

    if (isNaN(route.params.id) || isNaN(parseFloat(route.params.id))) {
        router.push({ path: '/drivers' })
    } else {
        isValidRoute.value = true
    }
})
</script>

<template>
    <USlideover
        :modelValue="isShowSlideover"
        @update:modelValue="closeSlideover"
    >
        <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
            <p>Edit Driver</p>
        </div>

        <div class="p-5">
            <DriverForm
                :driverId="Number($route.params.id)"
                v-if="isValidRoute"
            />
        </div>
    </USlideover>
</template>