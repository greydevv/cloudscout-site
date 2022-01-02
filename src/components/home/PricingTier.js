import { NavLink } from 'react-router-dom';
import { Checkmark, Crown } from 'components/Icons';
import './PricingTier.scss';

function PricingTier(props) {
    const tier = props.tier;

    return (
        <div className={ tier.featured ? 'pricing-tier-featured' : 'pricing-tier-regular' }>
            { tier.featured && <Crown className='featured-crown'/> }
            <div className='pricing-meta'>
                <h3 className='h3-left'>{ tier.name }</h3>
                <h1 className='h1-left'>${ tier.price }<span className='pricing-interval'> /month</span></h1>
            </div>
            <div className='pricing-perks'>
                {tier.perks.map((perk, i) => {
                    return (
                        <div key={ i } className='pricing-perk'>
                            <Checkmark />
                            <p className='p-left'>{ perk }</p>
                        </div>
                    );
                })}
            </div>
            <NavLink className='select-pricing' to='/'>Get Started</NavLink>
        </div>
    );
}

export default PricingTier;
