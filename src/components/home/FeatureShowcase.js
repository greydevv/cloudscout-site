import './FeatureShowcase.scss';

function FeatureShowcase(props) {
    const feature = props.feature
    return (
        <div className='feature'>
            <div className='feature__info p-md'>
                <div className='feature__info__inner'>
                    <h5 className='feature__name h5-spaced mb-xs'>{ feature.name }</h5>
                    <h2 className='feature__hook mb-sm'>{ feature.hook }</h2>
                    <p className='p-body-sm'>{ feature.description }</p>
                </div>
            </div>
            <div className='feature__thumbnail'>
                <img className='feature__img' alt={ feature.imgAlt } src={ feature.img } />
            </div>
        </div>
    );
}

export default FeatureShowcase;
