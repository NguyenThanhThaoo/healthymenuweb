//layout
import { WithouSidebar, JustContent } from "../layouts";
import ConfigRoutes from '../config/routes'
import {
    Profile,
    Setting,
    ManageCourses,
    ManageUsers,
    Login,
    DetailCourses,
    ManageTopics

} from '../pages'

const privateRoutes = [

    { path: ConfigRoutes.profile, component: Profile, layout: WithouSidebar },
    { path: ConfigRoutes.setting, component: Setting, layout: WithouSidebar },
    { path: ConfigRoutes.manageCourses, component: ManageCourses, layout: JustContent },
    { path: ConfigRoutes.manageUsers, component: ManageUsers, layout: JustContent },
    { path: ConfigRoutes.DetailCourses, component: DetailCourses, layout: JustContent },
    { path: ConfigRoutes.ManageTopics, component: ManageTopics, layout: JustContent },

]
const authRoutes = [
    { path: ConfigRoutes.Login, component: Login, layout: JustContent },
]

export { privateRoutes, authRoutes }