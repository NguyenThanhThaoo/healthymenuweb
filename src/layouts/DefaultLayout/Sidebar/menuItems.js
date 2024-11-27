import ConfigRoutes from '../../../config/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faRoadBridge, faBook } from '@fortawesome/free-solid-svg-icons'

export const navLinkStyle = ({ isActive }) => {
    return {
        backgroundColor: isActive ? ("rgb(255 196 85)") : "",
        color: isActive ? ("rgb(0,0,0)") : "",
    }
}

export const menuItems = [
    {
        path: ConfigRoutes.root,
        name: 'Trang chủ',
        icon: <FontAwesomeIcon icon={faHouseChimney} />
    },
    {
        path: ConfigRoutes.pathLearning,
        name: 'Lộ trình',
        icon: <FontAwesomeIcon icon={faRoadBridge} />
    },
    {
        path: ConfigRoutes.study,
        name: 'Học',
        icon: <FontAwesomeIcon icon={faBook} />
    }
]