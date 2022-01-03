import SectionHeader from 'components/SectionHeader';
import PricingTier from 'components/PricingTier';

function Pricing() {
    const tiers = [
        {
            name: 'BASIC',
            price: 39,
            featured: false,
            perks: [
                'One account',
                'Unlimited favorites',
            ],
        },
        {
            name: 'PREMIUM',
            price: 99,
            featured: true,
            perks: [
                'Two accounts',
                'Unlimited favorites',
                'Limited notifications',
            ],
        },
        {
            name: 'TEAM',
            price: 129,
            featured: false,
            perks: [
                '10 accounts',
                'Unlimited favorites',
                'Unlimited notifications',
            ],
        }
    ];

    return (
        <div id='pricing'>
            <div className='section'>
                <SectionHeader
                    headText='Start Recruiting Smarter Today'
                    subText='No surprise fees. What you see is what you get.'
                />
                <div className='pricing__container mx-auto'> 
                    {tiers.map((tier, i) => {
                        return <PricingTier key={ i } tier={ tier } />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Pricing;
