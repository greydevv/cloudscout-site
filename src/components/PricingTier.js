import { NavLink } from 'react-router-dom';
import { Checkmark, Crown } from 'components/Icons';
import './PricingTier.scss';

export default function PricingTier(props) {
    const tier = props.tier;
    const featuredExt = tier.featured ? '-featured' : '';

    return (
        <div className={'pricing__tier' + featuredExt}>
            { tier.featured && <Crown className='pricing__crown__icon'/> }
            <div className='mb-sm'>
                <h5
                    className={'h5-spaced pricing__name' + featuredExt}
                >
                    { tier.name }
                </h5>
                <h1 className={'pricing__price' + featuredExt}>${ tier.price }<span className={'p-body-sm pricing__price__interval' + featuredExt}> /month</span></h1>
            </div>
            <div className='pricing__perks__container'>
                {tier.perks.map((perk, i) => {
                    return (
                        <div key={ i } className='pricing__perk__container'>
                            <Checkmark
                                className={'my-auto pricing__perk__checkmark' + featuredExt}
                            />
                            <p
                                className={'p-body-sm pricing__perk' + featuredExt}
                            >
                                { perk }
                            </p>
                        </div>
                    );
                })}
            </div>
            <NavLink
                className={'pricing__select' + featuredExt}
                to='/'
            >
                Get Started
            </NavLink>
        </div>
    );
}
