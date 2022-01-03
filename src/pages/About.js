import SectionHeader from 'components/SectionHeader';
import Profile from 'components/about/Profile';
import alfredoImg from 'assets/team/AlfredoSuarez-gag.jpg';
import greysonImg from 'assets/team/GreysonMurray-gag.jpg';
import nicholasImg from 'assets/team/NicholasChan.jpg';
import './About.scss';

function About() {
    const teamProfiles = [
        {
            name: 'Alfredo Suarez',
            title: 'CEO, CO-FOUNDER',
            description: 'Alfredo is a co-founder and Chief Executive Officer of cloudscout.  Currently pursuing a BS in Management Information Systems at Pennsylvania State University, Alfredo is heavily involved with Penn State Baseball as a Data Analyst.',
            img: alfredoImg,
            imgAlt: 'alfredo-suarez',
        },
        {
            name: 'Greyson Murray',
            title: 'CSA, CO-FOUNDER',
            description: 'Greyson is a co-founder and Chief Software Architect of cloudscout.  Developed Trayful in his senior year of high school, an iOS app which garnered 3,000+ downloads in its time on the App Store. A passionate software engineer, he developed the backend API and the frontend website of cloudscout. He is currently pursuing a BS in Computer Science at Pennsylvania State University.',
            img: greysonImg,
            imgAlt: 'greyson-murray',
        },
        {
            name: 'Nicholas Chan',
            title: 'CISO, CO-FOUNDER',
            description: 'Nick is a co-founder and Chief Information Security Officer of cloudscout. He is currently pursuing a BS in Computer Science at Pennsylvania State University.',
            img: nicholasImg,
            imgAlt: 'nicholas-chan',
        }
    ];

    return (
        <div id='about-us'>
            <div className='section'>
                <div className='about__intro'>
                    <div className='about__intro__text'>
                        <div className='about__intro__text__inner'>
                            <h1 className='intro__head mb-xxs'>Who We Are</h1>
                            <h5 className='intro__subhead h5-spaced mb-sm'>CLOUDSCOUT</h5>
                            <p className='p-body-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempus, nisl quis pulvinar suscipit, nibh elit iaculis lorem, ut blandit nulla purus id urna. Nulla tincidunt ante ligula, venenatis luctus tortor aliquam vitae. Sed efficitur tellus non ipsum dictum mattis. Nulla libero nibh, feugiat vitae urna ut, aliquam sollicitudin lectus. Duis ac nisi nec urna consequat porta. Sed viverra convallis eros, a convallis felis ultricies nec. Pellentesque cursus urna quis ipsum egestas, a dapibus ligula faucibus. Praesent vulputate sapien a urna lobortis, et elementum felis viverra. Sed euismod, ligula nec vestibulum finibus, eros ligula ultrices quam, ac dapibus ex nisi sit amet arcu. Nunc mollis eu ex a feugiat.</p>
                        </div>
                    </div>
                    <div className='about__intro__thumbnail'>
                    </div>
                </div>
            </div>
            <div className='section'>
                <div className='member__profiles mt-xxl mx-auto'>
                    {teamProfiles.map((member, i) => {
                        return (
                            <Profile key={ i } member={ member } />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default About;
