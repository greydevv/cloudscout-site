import alfredoImg from 'assets/team/AlfredoSuarez.jpg';
import greysonImg from 'assets/team/GreysonMurray.jpg';
import nicholasImg from 'assets/team/NicholasChan.jpg';
import './About.scss';

function About() {
    const teamProfiles = [
        {
            name: 'Alfredo Suarez',
            title: 'CEO, CO-FOUNDER',
            img: alfredoImg,
            imgAlt: 'alfredo-suarez',
        },
        {
            name: 'Greyson Murray',
            title: 'CSA, CO-FOUNDER',
            img: greysonImg,
            imgAlt: 'greyson-murray',
        },
        {
            name: 'Nicholas Chan',
            title: 'CISO, CO-FOUNDER',
            img: nicholasImg,
            imgAlt: 'nicholas-chan',
        }
    ];

    return (
        <div id='about-us'>
            <div className='section-content'>
                <div className='section-header'>
                    <h1 className='section-head'>About Us</h1>
                    <p className='section-subtext'>Learn about the minds behind <i>cloudscout</i>, the leading solution for quantitative transfer analysis.</p>
                </div>
                <div className='team-profiles'>
                    {teamProfiles.map((member, i) => {
                        return (
                            <div key={ i } className='profile'>
                                <div className='team-img-container'>
                                    <img className='team-img' alt={ member.imgAlt } src={ member.img } />
                                </div>
                                <div className='team-meta'>
                                    <h1>{ member.name }</h1>
                                    <p>{ member.title }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default About;
