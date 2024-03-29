import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_ROUTER_BASE),
    routes,
    scrollBehavior() {
        return {top: 0}
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        const stringTitle = <string>to.meta.title;
        document.title = `${document.title.split(' - ')[0]} - ${stringTitle}`;
    }

    next();
});

export default router;