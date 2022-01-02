import FeatureShowcase from 'components/home/FeatureShowcase';
import PricingTier from 'components/home/PricingTier';
import dashboardImg from 'assets/home/dashboard.png';
import notificationImg from 'assets/home/notification.png';
import { GradientButton } from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import './Landing.scss';

function Landing() {
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

    const features = [
        {
            name: 'Monitor Transfers',
            hook: 'Comprehensive and fluid dashboard.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            img: dashboardImg,
            imgAlt: 'dashboard',
        },
        {
            name: 'Get Notified',
            hook: 'Get immediate updates of transfer status.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
            img: notificationImg,
            imgAlt: 'push-notifications',
        }
    ];

    return (
        <>
            <div id='landing'>
                <div className='section'>
                    <div className='landing__container'>
                        <div className='landing__left pr-xxl'>
                            <h1 className='landing__slogan mb-xs'>Lorem ipsum dolor sit amet.</h1>
                            <p className='p-body-sm mb-xl'>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <GradientButton>
                                Get Started
                            </GradientButton>
                        </div>
                        <div className='landing__thumbnail'>
                        </div>
                    </div>
                </div>
            </div>
            <div id='features'>
                <div className='section'>
                    <div className='features__container'>
                        {features.map((feature, i) => {
                            return <FeatureShowcase key={ i } feature={ feature } />
                        })}
                    </div>
                </div>
            </div>
            <div id='pricing'>
                <div className='section'>
                    <SectionHeader
                        headText='Pricing Plans'
                        subText='Choose the plan that fits your needs.'
                    />
                    <div className='pricing__container mx-auto'> 
                        {tiers.map((tier, i) => {
                            return <PricingTier key={ i } tier={ tier } />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;
