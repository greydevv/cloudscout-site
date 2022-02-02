import { NavLink } from 'react-router-dom';

export function SidebarNavItem({icon, activeIcon, className, activeClassName, ...rest}) {
    return (
        <NavLink
            className={({ isActive }) => isActive ? activeClassName : className}
            { ...rest }
        >
            {({ isActive }) => {
                if (activeIcon === undefined) {
                    return icon;
                }
                return isActive ? activeIcon : icon;
            }}
        </NavLink>
    );
}

export function SidebarButtonItem({icon, ...rest}) {
    return (
        <button { ...rest }>
            { icon }
        </button>
    );
}
