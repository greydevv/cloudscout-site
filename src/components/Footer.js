import './Footer.scss';

function Footer({ linkSets, copyrightText }) {
    return (
        <div className='footer'>
            <div className='footer__content'>
                { linkSets && 
                    <div className='footer__links'>
                        {linkSets.map((linkSet, i) => {
                            return (
                                <div key={ i } className='footer__links__set'>
                                    <h4 className='footer__links__category'>{ linkSet.category }</h4>
                                    {linkSet.links.map((link, i) => {
                                        return <p className='footer__links__link p-body-sm' key={ 'link-' + i }>{ link }</p>;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                }
                <div className='footer__copyright'>
                    <p className='footer__copyright__text p-body-sm'>{ copyrightText }</p>
                </div>
            </div>
        </div>
    );
}


export default Footer;
