import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
// import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login";
import Index from "@/components/Index";

import tagmanage from "@/page/tagmanage";
import resourcemanage from "@/page/resourcemanage";

Vue.use(Router);
Vue.use(Vuex);


export default new Router({
  routes: [{
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/Index",
      name: "Index",
      component: Index,
      children: [{
          path: "/",
          name: "tagmanage",
          component: tagmanage
        },
        {
          path: "/tagmanage",
          name: "tagmanage",
          component: tagmanage
        },
        {
          path: "/resourcemanage",
          name: "resourcemanage",
          component: resourcemanage
        }
      ]
    }
  ],
  // mode: "history"
});
