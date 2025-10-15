import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    index("routes/Index.tsx"),
    route("login", "routes/Login.tsx"),
    route("register", "routes/Register.tsx"),
    route("tasks/new", "routes/NewTask.tsx"),
    route("tasks/edit/:id", "routes/Task.tsx"),
    
] satisfies RouteConfig;
