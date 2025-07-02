<template>
  <Card class="chat-room-card">
    <template #title>
      <span>Chat Room</span>
    </template>
    <template #content>
      <ScrollPanel class="chat-messages-panel" style="height: 50vh">
        <div v-for="(msg, idx) in messages" :key="idx" class="chat-message">
          <span class="chat-user">{{ msg.user }}:</span>
          <span class="chat-text">{{ msg.text }}</span>
        </div>
      </ScrollPanel>
      <form class="chat-input-container" @submit.prevent="sendMessage">
        <InputText
          v-model="newMessage"
          class="chat-input"
          type="text"
          placeholder="Type your message..."
          autocomplete="off"
        />
        <Button class="send-btn" type="submit" label="Send" />
      </form>
    </template>
  </Card>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ScrollPanel from 'primevue/scrollpanel';

const route = useRoute();
const messages = ref([
  { user: 'Alice', text: 'Hello!' },
  { user: 'Bob', text: 'Hi Alice!' },
]);
const newMessage = ref('');
const messagesContainer = ref(null);

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    messages.value.push({ user: 'You', text: newMessage.value });
    newMessage.value = '';
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
  }
}
</script>

<style scoped>
.chat-room-card {
  max-width: 500px;
  margin: 40px auto;
}
.chat-messages-panel {
  margin-bottom: 1rem;
}
.chat-message {
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
}
.chat-user {
  font-weight: bold;
  margin-right: 8px;
  color: #1976d2;
}
.chat-text {
  word-break: break-word;
}
.chat-input-container {
  display: flex;
  gap: 0.5rem;
}
.chat-input {
  flex: 1;
}
</style>