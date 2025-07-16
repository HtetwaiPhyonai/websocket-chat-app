import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

export function useChatRoom() {
  const router = useRouter();
  const toast = useToast();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const roomName = ref(currentUser?.chat_room ?? '1');
  const messages = ref([]);
  const newMessage = ref('');
  const chatContainer = ref(null);
  const loadingMessages = ref(false);
  const onlineUsers = ref([]);
  const typingUsers = ref([]);
  const connectionStatus = ref('Connecting...');

  const roomOptions = [
    { label: 'General', value: '1' },
    { label: 'Tech', value: '2' },
    { label: 'Random', value: '3' }
  ];

  function getRoomName(roomId) {
    const found = roomOptions.find(opt => opt.value === String(roomId));
    return found ? found.label : 'Unknown';
  }

  let echoChannel = null;
  let typingTimeout = null;

  onMounted(async () => {
    await fetchMessages();
    setupWebSocket();
  });

  onBeforeUnmount(() => {
    if (echoChannel) {
      echoChannel.stopListening('MessageSent');
      echoChannel.stopListening('UserTyping');
      echoChannel.stopListening('UserOnline');
      echoChannel.stopListening('UserOffline');
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  });

  function setupWebSocket() {
    if (window.Echo) {
      try {
        echoChannel = window.Echo.channel(`chat-room.${roomName.value}`);

        echoChannel.listen('MessageSent', (e) => {
          messages.value.push({
            id: e.id || Date.now(),
            sender: e.user?.email ?? e.sender,
            senderName: e.user?.name ?? e.senderName,
            text: e.message || e.text,
            created_at: e.created_at || new Date().toISOString(),
            status: 'delivered'
          });
          nextTick(scrollToBottom);
        });

        echoChannel.listen('UserTyping', (e) => {
          if (e.user?.email !== currentUser?.email) {
            if (!typingUsers.value.includes(e.user.name)) {
              typingUsers.value.push(e.user.name);
            }
            setTimeout(() => {
              const index = typingUsers.value.indexOf(e.user.name);
              if (index > -1) {
                typingUsers.value.splice(index, 1);
              }
            }, 3000);
          }
        });

        connectionStatus.value = 'Connected';
      } catch (error) {
        console.error('WebSocket setup error:', error);
        connectionStatus.value = 'Disconnected';
      }
    } else {
      connectionStatus.value = 'No WebSocket';
    }
  }

  async function sendMessage() {
    if (!newMessage.value.trim()) return;

    const messageText = newMessage.value.trim();
    newMessage.value = '';

    try {
      await axios.post('/api/chat/send', {
        room_id: roomName.value,
        message: messageText
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      // Do not push the message here; rely on WebSocket event
    } catch (error) {
      console.error('Send message error:', error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to send message',
        life: 3000
      });
    }
  }

  async function fetchMessages() {
    if (loadingMessages.value) return;

    loadingMessages.value = true;
    try {
      const response = await axios.get(`/api/chat/${roomName.value}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      messages.value = response.data.map(msg => ({
        ...msg,
        status: 'delivered'
      }));
      nextTick(scrollToBottom);
    } catch (error) {
      console.error('Fetch messages error:', error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load messages',
        life: 3000
      });
    } finally {
      loadingMessages.value = false;
    }
  }

  async function switchRoom(newRoomId) {
    if (String(roomName.value) === String(newRoomId)) return;

    // Clean up current room
    if (echoChannel) {
      echoChannel.stopListening('MessageSent');
      echoChannel.stopListening('UserTyping');
    }

    roomName.value = newRoomId;
    messages.value = [];

    // Update user's room preference
    // try {
    //   await axios.post('/api/user/update-room', {
    //     room_id: newRoomId
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    //     }
    //   });

    //   // Update localStorage
    //   const user = JSON.parse(localStorage.getItem('user') || '{}');
    //   user.chat_room = newRoomId;
    //   localStorage.setItem('user', JSON.stringify(user));
    // } catch (error) {
    //   console.error('Room switch error:', error);
    // }

    // Fetch new room messages and setup WebSocket
    await fetchMessages();
    setupWebSocket();
  }

  function handleTyping() {
    if (echoChannel && currentUser?.email) {
      echoChannel.whisper('typing', {
        user: currentUser
      });
    }
  }

  function scrollToBottom() {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }

  function handleLogout() {
    localStorage.clear();
    toast.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'You have been logged out successfully',
      life: 2000
    });
    router.push('/login');
  }

  const isSidebarOpen = ref(true)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }


  return {
    currentUser,
    roomName,
    messages,
    newMessage,
    chatContainer,
    loadingMessages,
    onlineUsers,
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
  };
}
