import {createStore} from 'vuex'
import buildingsModule from "./modules/buildings.js";


const store = createStore({

    modules: {
        buildings: buildingsModule,

    },
    state() {
        return {
            isLoggedIn: false,
            userId:null,
            roleId:null
        };
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
    actions: {
        login(context) {
            context.commit('login');
        },
        logout(context) {
            context.commit('logout');
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isLoggedIn;
        }
    }


})

export default store;
