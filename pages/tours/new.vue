<script setup lang="ts">
let isShowSlideover = ref(true)

function closeSlideover () {
    const router = useRouter()
    router.push({ path: '/tours' })
}
</script>

<template>
    <USlideover
        :modelValue="isShowSlideover"
        @update:modelValue="closeSlideover"
    >
        <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
            <p>Create new Tour</p>
        </div>

        <div class="p-5">
            <TourForm />
        </div>
    </USlideover>
</template>