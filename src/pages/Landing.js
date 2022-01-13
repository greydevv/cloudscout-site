import FeatureShowcase from 'components/home/FeatureShowcase';
import PricingTier from 'components/PricingTier';
import dashboardImg from 'assets/home/dashboard.png';
import notificationImg from 'assets/home/notification.png';
import { GradientButton } from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import dashboardGraphic from 'assets/graphics/dashboard.png';
import filtersGraphic from 'assets/graphics/filters.png';
import statisticsGraphic from 'assets/graphics/statistics.png';
import notificationGraphic from 'assets/graphics/notifications.png';
// import SchoolCarousel from 'components/SchoolCarousel';
// import Michigan from 'assets/schools/michigan.png';
// import OhioState from 'assets/schools/ohio_state.png';
// import PennState from 'assets/schools/penn_state.png';
// import TexasAM from 'assets/schools/texas_am.png';
// import Purdue from 'assets/schools/purdue.png';
// import Iowa from 'assets/schools/iowa.png';
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
    
    // const schools = [
    //     <img alt='' src={ Michigan } key={1} className='school__img' />,
    //     <img alt='' src={ OhioState } key={2} className='school__img' />,
    //     <img alt='' src={ PennState } key={3} className='school__img' />,
    //     <img alt='' src={ TexasAM } key={4} className='school__img' />,
    //     <img alt='' src={ Purdue } key={5} className='school__img' />,
    //     <img alt='' src={ Iowa } key={6} className='school__img' />,
    // ];

    const features = [
        {
            name: 'Monitor Transfers',
            hook: 'Comprehensive recruitment dashboard.',
            description: 'Utilize powerful and instinctive dashboard to monitor the Transfer Portal at any moment. Complete with advanced filters to refine your player search, cloudscout offers many ways to get the right players from the portal to your signing table.',
            img: filtersGraphic,
            imgAlt: 'dashboard filters',
        },
        {
            name: 'Analyze Deeper',
            hook: 'In-depth statistical player analysis.',
            description: 'Utilize cloudscout’s exhaustive analytics tools to explore how the player performs. We use statistical algorithms to accurately rank how players are performing in comparison to their peers.',
            img: statisticsGraphic,
            imgAlt: 'player transfer statistics'
        },
        {
            name: 'Act First',
            hook: 'Get immediate transfer status updates.',
            description: 'Receive push notifications when certain events happen in the Transfer Portal such as a player entering, withdrawing from, or transferring out of the Transfer Portal. cloudscout collects statistics about players that match your previous activity and finds players with similar characteristics.',
            img: notificationGraphic,
            imgAlt: 'transfer push notifications',
        }
    ];

    return (
        <>
            <div id='landing'>
                <div className='section'>
                    <div className='landing__container'>
                        <div className='landing__text pr-xxl'>
                            <div className='landing__text__inner'>
                                <h1 className='landing__slogan mb-xs'>Effective recruiting made easy.</h1>
                                <p className='p-body-sm mb-xl'>Tools for any program at any level to leverage the power of recruiting college athlete transfers. Certain limitations and fees apply.</p>
                                { process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' &&
                                    <GradientButton>
                                        Get Started
                                    </GradientButton>
                                }
                            </div>
                        </div>
                        <div className='landing__thumbnail'>
                            <img className='landing__img' src={ dashboardGraphic } />
                        </div>
                    </div>
                </div>
            </div>
            <div id='features'>
                <div className='section'>
                    <div className='features__container'>
                        {features.map((feature, i) => {
                            return <FeatureShowcase key={ i } feature={ feature } textRight={ (i % 2) == 0 }/>;
                        })}
                    </div>
                </div>
            </div>
            {/*
                <div id='schools'>
                <SchoolCarousel schools={ schools } />
                </div>
            */}
            { process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT' &&
                <div id='pricing'>
                    <div className='section'>
                        <SectionHeader
                            headText='Pricing Plans'
                            subText='Choose the plan that fits your needs.'
                        />
                        <div className='pricing__container mx-auto'> 
                            {tiers.map((tier, i) => {
                                return <PricingTier key={ i } tier={ tier } />;
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Landing;
