import Profile from 'components/about/Profile';
import alfredoImg from 'assets/team/AlfredoSuarez.jpg';
import greysonImg from 'assets/team/GreysonMurray.jpg';
import nicholasImg from 'assets/team/NicholasChan.jpg';
import './About.scss';

function About() {
    const teamProfiles = [
        {
            name: 'Alfredo Suarez',
            title: 'CEO, co-founder',
            description: 'Alfredo is a co-founder and Chief Executive Officer of cloudscout. Currently pursuing a BS in Management Information Systems at Pennsylvania State University, Alfredo is heavily involved with Penn State Baseball as a Data Analyst.',
            img: alfredoImg,
            imgAlt: 'alfredo-suarez',
        },
        {
            name: 'Greyson Murray',
            title: 'CSA, co-founder',
            description: 'Greyson is a co-founder and Chief Software Architect of cloudscout. Developed an iOS app in his senior year of high school which garnered 3,000+ downloads in its time on the App Store. Greyson is pursuing a BS in Computer Science at Pennsylvania State University.',
            img: greysonImg,
            imgAlt: 'greyson-murray',
        },
        {
            name: 'Nicholas Chan',
            title: 'CISO, co-founder',
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
                            <p className='p-body-sm'>cloudscout offers athletic programs across the country the tools necessary to recruit players in the Transfer Portal. Our mission is to provide a level playing field for all players and programs involved with transfers. Our team draws from a diverse software and engineering to push this industry forward.</p>
                        </div>
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
