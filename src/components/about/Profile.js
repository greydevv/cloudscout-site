import { NavLink } from 'react-router-dom';
import './Profile.scss';

export default function Profile({ member }) {
    return (
        <div className='profile'>
            <div className='profile__thumbnail mb-md'>
                {/*
                    <NavLink to='/member'>
                        <img className='profile__img' alt={ member.imgAlt } src={ member.img } />
                    </NavLink>
                */}
                <img className='profile__img' alt={ member.imgAlt } src={ member.img } />
            </div>
            <div className='profile__meta'>
                <h4 className='profile__name'>{ member.name }</h4>
                <h5 className='profile__title h5-spaced mb-sm'>{ member.title }</h5>
                <p className='p-body-sm'>{ member.description }</p>
            </div>
        </div>
    );
}
