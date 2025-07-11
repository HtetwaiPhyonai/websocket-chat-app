<template>
      <div class="lg:col-span-1 bg-white/95 backdrop-blur-sm ">
        <!-- Trigger Button -->
        <Button
          icon="pi pi-list"
          label="Select Chat Room"
          @click="togglePopover"
          class="mb-3"
        />
        <!-- Popover with MegaMenu -->
        <OverlayPanel ref="op">
          <MegaMenu :model="menuItems" orientation="vertical" />
        </OverlayPanel>
      </div>
</template>

<script setup>
import Button from "primevue/button";
import MegaMenu from "primevue/megamenu";
import OverlayPanel from "primevue/overlaypanel";
import { ref, computed } from "vue";

const props = defineProps({
  roomOptions: Array,
  roomName: [String, Number],
  switchRoom: Function,
  currentUser: Object,
});

const op = ref(null);

function togglePopover(event) {
  op.value.toggle(event);
}

const menuItems = computed(() =>
  props.roomOptions.map(room => ({
    label: room.label,
    icon: props.roomName == room.value ? "pi pi-check-circle" : "pi pi-circle",
    command: () => {
      props.switchRoom(room.value);
      op.value.hide();
    }
  }))
);
</script>
