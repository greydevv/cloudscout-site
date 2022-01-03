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

    return (
        <div className='sidebar-wrapper'>
            <nav className='sidebar'>
                <div className='sidebar-section sidebar-header'>
                    <NavLink to='/'>
                        <img alt='cloudscout-logo' src={ logoBlue } className='sidebar-logo' />
                    </NavLink>
                </div>
                <div className='sidebar-section sidebar-content'>
                    <SidebarNavItem
                        to='' 
                        className='sidebar-item'
                        activeClassName='sidebar-item-active'
                        icon={<Dashboard width={24} height={24} />}
                        end
                    />
                    <SidebarNavItem
                        to='favorites' 
                        className='sidebar-item'
                        activeClassName='sidebar-item-active'
                        icon={<Star width={24} height={24} />}
                    />
                    <SidebarNavItem
                        to='settings' 
                        className='sidebar-item'
                        activeClassName='sidebar-item-active'
                        icon={<Cog width={24} height={24} />}
                    />
                </div>
                <div className='sidebar-section sidebar-footer'>
                    <SidebarButtonItem
                        onClick={ () => logout({ returnTo: window.location.origin }) }
                        icon={<Logout width={24} height={24} />}
                        className='sidebar-item'
                    />
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
