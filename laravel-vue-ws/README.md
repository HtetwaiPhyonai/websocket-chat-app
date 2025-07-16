# WebSocket Chat App (Laravel + Vue + PrimeVue)

A modern real-time chat application using **Laravel** (backend, API, WebSocket) and **Vue 3 + PrimeVue** (frontend), powered by **Pusher** for real-time events.

---

## Features
- Real-time chat with WebSockets (Laravel Echo + Pusher)
- Multiple chat rooms
- User authentication
- Responsive, modern UI (PrimeVue + TailwindCSS)
- Typing indicators, online status, and more

---

## Requirements
- Node.js >= 16.x
- npm >= 8.x
- PHP >= 8.1
- Composer >= 2.x
- MySQL or PostgreSQL (or SQLite for testing)
- [Pusher account](https://pusher.com/) (free tier is fine)

---

## 1. Clone the Repository

```sh
gh repo clone HtetwaiPhyonai/websocket-chat-app
git@github.com:HtetwaiPhyonai/websocket-chat-app.git
cd laravel-vue-ws
```

---

## 2. Backend Setup (Laravel)

### Install PHP dependencies
```sh
composer install
```

### Copy and configure environment
```sh
cp .env.example .env
# Edit .env and set your DB credentials, BROADCAST_DRIVER, PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET, PUSHER_HOST, PUSHER_PORT, etc.
```

#### Example Pusher-related .env settings:
```
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your-app-id
PUSHER_APP_KEY=your-app-key
PUSHER_APP_SECRET=your-app-secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=mt1
```

### Generate app key
```sh
php artisan key:generate
```

### Run migrations
```sh
php artisan migrate
```
<!-- 
### (Optional) Seed database
```sh
php artisan db:seed
``` -->

### Start Laravel backend
```sh
php artisan serve
# Default: http://127.0.0.1:8000
```

### Start Laravel WebSocket server (if using laravel-websockets)
```sh
php artisan websockets:serve
# Default: ws://127.0.0.1:6001
```

---

## 3. Frontend Setup (Vue + PrimeVue)

### Install JS dependencies
```sh
npm install
npm install pusher-js
```

### Start Vite dev server
```sh
npm run dev
# Default: http://localhost:5173
```

---

## 4. Environment Configuration

- In `.env`, set the Pusher variables as above.
- In `resources/js/bootstrap.js` or `app.js`, configure Echo for Pusher:

```js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster: process.env.MIX_PUSHER_APP_CLUSTER,
});
```

- Make sure `primeicons/primeicons.css` is imported in your `app.js`:
```js
import 'primeicons/primeicons.css';
```

---

## 5. Usage
- Register/login as a user.
- Join or switch chat rooms.
- Send messages in real time.
- See typing indicators and online users.

---

## 6. Troubleshooting
- **WebSocket not connecting?**
  - Make sure `php artisan websockets:serve` is running.
  - Check your `.env` and frontend Echo config for correct host/port/key/cluster.
- **Icons not showing?**
  - Ensure `primeicons/primeicons.css` is imported and `primeicons` is installed.
- **Message appears twice?**
  - Only add messages to the UI when received from the WebSocket event.

---

## 7. Build for Production

```sh
npm run build
```

---

## 8. License

MIT
