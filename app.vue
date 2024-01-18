<template>
    <div class="flex h-screen">
        <Sidebar />
        
        <main class="flex-1">
            <NuxtPage />
        </main>
    </div>

    <UNotifications />
</template>

<style>
html, body {
    overflow: hidden;
}

.scroll-container {
    height: calc(100vh - 4rem);
    overflow-y: auto;
}
</style>