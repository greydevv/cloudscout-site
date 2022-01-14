import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Burger, Close } from 'components/Icons';
import './Navbar.scss';

function Navbar({ children, minWidth=900}) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const toggleNavBurger = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {
        const changeWidth = () => {
          setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    return (
        <div className='navbar p-md'>
            { screenWidth > minWidth
                ? children
                : (
                    <>
                        {children.map((child) => {
                            if (child.type === NavbarBrand) {
                                return child;
                            }
                        })}
                        <NavbarBurgerMenu onClick={ toggleNavBurger } isOpen={ toggleMenu } children={ children } />
                    </>
                )
            }
        </div>
    )
}

function NavbarBurgerMenu({ children, isOpen, ...rest}) {
    return (
        <div className='my-auto navbar__burger__menu'>
            <button className='navbar__burger__menu__btn' { ...rest }>
                { isOpen ? <Close /> : <Burger /> }
            </button>
            <div className={ 'p-md navbar__burger__menu__items' + ( isOpen ? '-open' : '') }>
                {children.map((child) => {
                    if (child.type === NavbarItems) {
                        return child;
                    }
                })}
            </div>
        </div>
    );
}

function NavbarBrand({ to, children }) {
    return (
        <div className='navbar__branding__container my-auto'>
            <NavLink to={ to } className='navbar__branding'>
                { children }
            </NavLink>
        </div>
    );
}

function NavbarItems({ children }) {
    return (
        <div className='navbar__links my-auto'>
            { children }
        </div>
    );
}

function NavbarLink({ to, text, isNavLink, isButton, ...rest}) {
    if (isNavLink) {
        return (
            <NavLink 
                to={ to }
                className={isButton ? 'navbar__link-btn my-auto' : ({ isActive }) => isActive ? 'navbar__link-active my-auto' : 'navbar__link my-auto'} 
                { ...rest }
            >
                { text }
            </NavLink>
        );
    }
    return (
        <Link
            to={ to }
            className={isButton ? 'navbar__link__btn my-auto' : 'navbar__link my-auto'}
            { ...rest }
        >
            { text }
        </Link>
    );
}

export { Navbar,
         NavbarBrand,
         NavbarItems,
         NavbarLink };
