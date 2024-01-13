<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: drivers } = await supabase.from('drivers').select()
</script>

<template>
    <table>
        <tr>
            <th>Name</th>
            <th>Location</th>
        </tr>
        <tr v-for="driver in drivers" :key="driver.id">
            <td>{{ driver.name }}</td>
            <td>{{ driver.location }}</td>
        </tr>
    </table> 
</template>