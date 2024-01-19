<template>
    <div class="xl:flex h-screen">
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
</style>