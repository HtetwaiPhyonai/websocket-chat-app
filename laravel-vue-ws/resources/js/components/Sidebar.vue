<template>
    <div class="flex">
        <!-- Sidebar -->
        <div
            :class="[
                'bg-white shadow-lg h-screen transition-all duration-300 ease-in-out z-40 flex flex-col',
                visibleLeft ? 'w-64' : 'w-16',
            ]"
        >
            <div
                class="p-4 flex justify-between items-center border-b"
                :class="visibleLeft ? '' : 'justify-center'"
            >
                <UserProfile v-if="visibleLeft" />
                <Button
                    :icon="visibleLeft ? 'pi pi-times' : 'pi pi-bars'"
                    class="p-button-text p-button-rounded"
                    @click="visibleLeft = !visibleLeft"
                    :aria-label="visibleLeft ? 'Close Sidebar' : 'Open Sidebar'"
                    :tooltip="visibleLeft ? 'Close Sidebar' : 'Open Sidebar'"
                    tooltip-options="{ position: 'right' }"
                />
            </div>

            <!-- Only show PanelMenu when expanded -->
            <PanelMenu
                v-if="visibleLeft"
                :model="panelMenuItems"
                class="p-4 flex-1 overflow-auto"
            />
        </div>

        <!-- Main content area -->
        <!-- <div
            :class="[
                'flex-1 transition-margin duration-300 ease-in-out',
                visibleLeft ? 'ml-64' : 'ml-16',
            ]"
            class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
            <div class="p-4">
                <Home />
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import PanelMenu from "primevue/panelmenu";
import Button from "primevue/button";
import panelMenuItems from "../data/panelMenuItems";
import UserProfile from "./UserProfile.vue";

const visibleLeft = ref(true);
</script>
