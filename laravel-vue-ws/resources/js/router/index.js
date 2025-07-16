import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "../page/ChatRoom/ChatRoom.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
// import App from "../components/App.vue";
import Default from "../layout/default.vue";
import Home from "../layout/home.vue";
import Profile from "../components/Profile.vue";

const routes = [
    {
        path: "/",
        redirect: "/register",
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
    {
        path: "/default",
        name: "default",
        component: Default,
        children: [
            {
                path: "/chat-room",
                name: "chat-room",
                component: ChatRoom,
            },
            {
                path: "/home",
                name: "home",
                component: Home,
            },
            {
                path: "/profile",
                name: "profile",
                component: Profile,
            },
        ],
    },

    // {
    //     path: "/chat-room",
    //     name: "chat-room",
    //     component: ChatRoom,
    // },

    // Add more routes here as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
