import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "../page/ChatRoom/ChatRoom.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
// import App from "../components/App.vue";
import Default from "../layout/default.vue";

const routes = [
    {
        path: "/",
        redirect: "/register",
    },
    {
        path: "/home",
        name: "default",
        component: Default,
        children: [
            {
                path: "/chat-room",
                name: "chat-room",
                component: ChatRoom,
            },
        ]
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    // {
    //     path: "/chat-room",
    //     name: "chat-room",
    //     component: ChatRoom,
    // },
    // {
    //     path: "/home",
    //     name: "default",
    //     component: Default,
    // },
    // Add more routes here as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
