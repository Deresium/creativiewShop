import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {routes} from "./routes";

let history = createWebHistory();
if (!import.meta.env.PROD) {
    history = createWebHashHistory(import.meta.env.VITE_APP_ROUTER_BASE);
}
const router = createRouter({
    history: history,
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