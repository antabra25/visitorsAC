import {createRouter, createWebHistory} from "vue-router";
import Auth from "../views/Auth.vue";
import HomePage from "../views/HomePage.vue";
import AddVisitor from "../views/AddVisitor.vue";
import AddUser from "../views/AddUser.vue";
import AddOffice from "../views/AddOffice.vue";
import AddReason from "../views/AddReason.vue";
import TheReport from "../views/TheReport.vue";
import VerifyPass from "../views/VerifyPass.vue";
import ActiveVisitor from "../views/ActiveVisitor.vue";
import FindVisitor from "../views/FindVisitor.vue";
import TheGenerator from "../views/TheGenerator.vue";
import AddBuilding from "../views/AddBuilding.vue";
import AddLocation from "../views/AddLocation.vue";
import SelectLocation from "../views/SelectLocation.vue";
import NotFound from "../views/NotFound.vue";
import Users from "../views/Users.vue";

const routes = [
    {path: "/", component: Auth},
    {path: "/home", component: HomePage},
    {path: "/visitor", component: AddVisitor},
    {path: "/user", component: AddUser},
    {path: "/office", component: AddOffice},
    {path: "/reason", component: AddReason},
    {path: "/report", component: TheReport},
    {path: "/verify", component: VerifyPass},
    {path: "/visitor/active", component: ActiveVisitor},
    {path: "/visitor/find", component: FindVisitor},
    {path: "/generator", component: TheGenerator},
    {path: "/building", component: AddBuilding},
    {path: "/coordinate", component: AddLocation},
    {path: "/location", component: SelectLocation},
    {path: "/users", component: Users},
    {path: "/:notFound(.*)", component: NotFound}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
