<template>
    <div class="w-80 border-r border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
            <p>tour-planner</p>
        </div>
        
        <div class="p-5">
            <p>
                <ULink
                    to="/drivers"
                    active-class="text-gray-700 dark:text-gray-200"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Driver Management
                </ULink>
            </p>
            <p class="mt-5">
                <ULink
                    to="/tours"
                    active-class="text-gray-700 dark:text-gray-200"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Tour Management
                </ULink>
            </p>
        </div>
    </div>
</template>
