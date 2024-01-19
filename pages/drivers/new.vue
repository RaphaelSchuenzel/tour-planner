<script setup lang="ts">
let isShowSlideover = ref(true)

function closeSlideover () {
    const router = useRouter()
    router.push({ path: '/drivers' })
}
</script>

<template>
    <USlideover
        :modelValue="isShowSlideover"
        @update:modelValue="closeSlideover"
    >
        <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
            <p>Add new Driver</p>

            <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="closeSlideover"
            />
        </div>

        <div class="p-5">
            <DriverForm />
        </div>
    </USlideover>
</template>