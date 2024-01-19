<template>
    <div class="flex xl:block px-5 xl:px-0 h-16 xl:h-screen justify-between items-center border-b xl:w-80 xl:border-r border-gray-200 dark:border-gray-700">
        <div class="xl:flex xl:justify-between xl:items-center xl:h-16 xl:px-5 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
            <p>tour-planner</p>
        </div>
        
        <div class="flex xl:block xl:p-5">
            <p>
                <ULink
                    to="/drivers"
                    active-class="text-gray-700 dark:text-gray-200"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Drivers
                </ULink>
            </p>
            <p class="ml-3 xl:ml-0 xl:mt-5">
                <ULink
                    to="/tours"
                    active-class="text-gray-700 dark:text-gray-200"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Tours
                </ULink>
            </p>
        </div>
    </div>
</template>
