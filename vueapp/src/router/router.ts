import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {top: 0}
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        const stringTitle = <string>to.meta.title;
        if(document.title.includes(' - ')){
            document.title = `${document.title.split(' - ')[0]} - ${stringTitle}`;
        }else{
            document.title = stringTitle;
        }
    }

    next();
});

export default router;