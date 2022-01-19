import logoBlue from 'assets/images/logoBlue.png';
import { SidebarNavItem, SidebarButtonItem } from 'components/SidebarItem';
import { Dashboard,
         Cog,
         Star,
         Logout } from 'components/Icons';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Sidebar.scss';

function Sidebar() {
    const { logout } = useAuth0();

    // TODO: refactor SASS names
    return (
        <div className='sidebar__wrapper'>
            <nav className='sidebar'>
                <div className='sidebar__section sidebar__header'>
                    <NavLink to='/'>
                        <img alt='cloudscout__logo' src={ logoBlue } className='sidebar__logo' />
                    </NavLink>
                </div>
                <div className='sidebar__section sidebar__content'>
                    <SidebarNavItem
                        to='' 
                        className='sidebar__item'
                        activeClassName='sidebar__item-active'
                        icon={<Dashboard width={24} height={24} />}
                        end
                    />
                    <SidebarNavItem
                        to='favorites' 
                        className='sidebar__item'
                        activeClassName='sidebar__item__active'
                        icon={<Star width={24} height={24} />}
                    />
                    <SidebarNavItem
                        to='settings' 
                        className='sidebar__item'
                        activeClassName='sidebar__item__active'
                        icon={<Cog width={24} height={24} />}
                    />
                </div>
                <div className='sidebar__section sidebar__footer'>
                    <SidebarButtonItem
                        onClick={ () => logout({ returnTo: window.location.origin }) }
                        icon={<Logout width={24} height={24} />}
                        className='sidebar__item__button'
                    />
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
