<template>
    <div class="mx-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-3">
            <Avatar
                :label="currentUser?.name?.charAt(0)?.toUpperCase() || 'U'"
                style="background-color: #6366f1; color: white"
                shape="circle"
            />
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">
                    {{ currentUser?.name || "User" }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                    {{ currentUser?.email || "No email" }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import Avatar from "primevue/avatar";
defineProps({
    currentUser: {
        type: Object,
        default: () => ({ name: "Unknown", email: "unknown@gmail.com" }),
    },
});
</script>
