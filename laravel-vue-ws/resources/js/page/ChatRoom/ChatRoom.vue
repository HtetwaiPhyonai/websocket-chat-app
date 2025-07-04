<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center py-4 px-4">
    <!-- Main Chat Interface -->
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- Room Selection Sidebar -->
      <Card class="lg:col-span-1 bg-white/95 backdrop-blur-sm shadow-2xl">
        <template #title>
          <div class="flex items-center gap-2 p-4">
            <i class="pi pi-list text-indigo-600"></i>
            <span class="text-lg font-semibold">Chat Rooms</span>
          </div>
        </template>
        <template #content>
          <div class="space-y-3 px-4 pb-4">
            <div v-for="room in roomOptions" :key="room.value" 
                 @click="switchRoom(room.value)"
                 class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                 :class="String(roomName) === room.value ? 'bg-indigo-100 border-2 border-indigo-300' : 'hover:bg-gray-50 border-2 border-transparent'">
              <div class="w-3 h-3 rounded-full" 
                   :class="String(roomName) === room.value ? 'bg-indigo-500' : 'bg-gray-300'"></div>
              <div class="flex-1">
                <p class="font-medium" :class="String(roomName) === room.value ? 'text-indigo-700' : 'text-gray-700'">
                  {{ room.label }}
                </p>
                <p class="text-xs text-gray-500">Room {{ room.value }}</p>
              </div>
              <i v-if="String(roomName) === room.value" class="pi pi-check text-indigo-600"></i>
            </div>
          </div>

          <!-- User Info -->
          <div class="mx-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <Avatar :label="currentUser?.name?.charAt(0)?.toUpperCase() || 'U'" 
                      style="background-color: #6366f1; color: white" 
                      shape="circle" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ currentUser?.name || 'User' }}</p>
                <p class="text-xs text-gray-500 truncate">{{ currentUser?.email || 'No email' }}</p>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Main Chat Area -->
      <Card class="lg:col-span-3 bg-white/95 backdrop-blur-sm shadow-2xl">
        <template #title>
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <i class="pi pi-comments text-indigo-600"></i>
                <span class="text-lg font-semibold">{{ getRoomName(roomName) }}</span>
              </div>
              <Tag :value="`${messages.length} messages`" severity="info" />
            </div>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-refresh" @click="fetchMessages" 
                      :loading="loadingMessages"
                      class="p-button-text p-button-sm" v-tooltip="'Refresh Messages'" />
              <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" 
                      class="p-button-danger p-button-sm" />
            </div>
          </div>
        </template>
        
        <template #content>
          <div class="px-4 pb-4">
            <!-- Typing Indicator -->
            <div v-if="typingUsers.length > 0" class="mb-3 p-2 bg-blue-50 rounded-lg">
              <div class="flex items-center gap-2">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-sm text-blue-600">
                  {{ typingUsers.join(', ') }} {{ typingUsers.length === 1 ? 'is' : 'are' }} typing...
                </span>
              </div>
            </div>

            <!-- Loading indicator for initial load -->
            <div v-if="loadingMessages && messages.length === 0" class="flex justify-center items-center h-96">
              <div class="text-center">
                <ProgressSpinner size="40px" />
                <p class="mt-4 text-gray-500">Loading messages...</p>
              </div>
            </div>

            <!-- Chat Messages -->
            <div v-else ref="chatContainer" class="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-200">
              <!-- Empty state -->
              <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="pi pi-comments text-4xl mb-4 opacity-50"></i>
                <p class="text-lg font-medium">No messages yet</p>
                <p class="text-sm">Be the first to start the conversation!</p>
              </div>

              <!-- Messages -->
              <div v-for="(msg, index) in messages" :key="msg.id || index" 
                   class="flex items-end transition-all duration-300 ease-in-out"
                   :class="isCurrentUser(msg.sender) ? 'justify-end' : 'justify-start'">
                
                <div class="flex items-end space-x-2 max-w-xs lg:max-w-md" 
                     :class="isCurrentUser(msg.sender) ? 'flex-row-reverse space-x-reverse' : ''">
                  
                  <div class="relative">
                    <Avatar :label="getUserInitial(msg.sender || msg.senderName)" 
                            :style="{ backgroundColor: getUserColor(msg.sender || msg.senderName) }" 
                            shape="circle" size="small" class="shadow-md" />
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div class="relative group">
                    <div class="p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md"
                         :class="isCurrentUser(msg.sender) 
                           ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md' 
                           : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'">
                      
                      <div class="text-xs opacity-75 mb-1 flex items-center gap-2">
                        <span>{{ msg.senderName || getUserName(msg.sender) || 'Unknown' }}</span>
                        <span>•</span>
                        <span>{{ formatTime(msg.created_at || msg.timestamp || new Date()) }}</span>
                      </div>
                      
                      <div class="text-sm leading-relaxed">{{ msg.text || msg.message }}</div>
                    </div>
                    
                    <!-- Message status for current user -->
                    <div v-if="isCurrentUser(msg.sender)" class="text-xs text-gray-400 mt-1 text-right">
                      <i class="pi pi-clock" v-if="msg.status === 'sending'"></i>
                      <i class="pi pi-check" v-else-if="msg.status === 'sent'"></i>
                      <i class="pi pi-check-circle text-blue-500" v-else-if="msg.status === 'delivered'"></i>
                      <i class="pi pi-check-circle text-green-500" v-else-if="msg.status === 'read'"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Loading indicator for refresh -->
              <div v-if="loadingMessages && messages.length > 0" class="flex justify-center py-2">
                <ProgressSpinner size="20px" />
              </div>
            </div>

            <!-- Message Input -->
            <div class="mt-4">
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <Button icon="pi pi-paperclip" class="p-button-text p-button-sm" 
                        v-tooltip="'Attach file'" disabled />
                <Button icon="pi pi-face-smile" class="p-button-text p-button-sm" 
                        v-tooltip="'Add emoji'" disabled />
                
                <InputText v-model="newMessage" 
                           @keyup.enter="sendMessage"
                        
                           :disabled="loadingMessages"
                           placeholder="Type your message..." 
                           class="flex-1 border-0 bg-transparent focus:ring-0" />
                
                <Button icon="pi pi-send" 
                        @click="sendMessage"
                        :disabled="!newMessage.trim() || loadingMessages"
                        class="p-button-primary p-button-sm" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Toast for notifications -->
    <Toast />
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import { useChatRoom } from '../ChatRoom/useChatRoom'

// Use the composable
const {
  currentUser,
  roomName,
  messages,
  newMessage,
  chatContainer,
  loadingMessages,
  typingUsers,
  connectionStatus,
  roomOptions,
  getRoomName,
  sendMessage,
  fetchMessages,
  switchRoom,
  handleTyping,
  scrollToBottom,
  handleLogout,
} = useChatRoom()

// Helper functions
const isCurrentUser = (sender) => {
  return sender && currentUser?.email && 
         sender.trim().toLowerCase() === currentUser.email.trim().toLowerCase()
}

const getUserInitial = (identifier) => {
  if (!identifier) return '?'
  
  if (identifier.includes('@')) {
    const namePart = identifier.split('@')[0]
    return namePart.charAt(0).toUpperCase()
  }
  
  return identifier.charAt(0).toUpperCase()
}

const getUserColor = (identifier) => {
  if (!identifier) return '#6b7280'
  
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e']
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const getUserName = (sender) => {
  if (!sender) return 'Unknown'
  
  if (sender.includes('@')) {
    const namePart = sender.split('@')[0]
    return namePart.split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ')
  }
  
  return sender
}

const formatTime = (timestamp) => {
  if (!timestamp) return 'Now'
  
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  
  return date.toLocaleDateString() === now.toLocaleDateString() 
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString()
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
