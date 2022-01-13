import './FeatureShowcase.scss';

function FeatureInfo({ feature }) {
    return (
        <div className='feature__info p-md'>
            <div className='feature__info__inner'>
                <h5 className='feature__name h5-spaced mb-xs'>{ feature.name }</h5>
                <h2 className='feature__hook mb-sm'>{ feature.hook }</h2>
                <p className='p-body-sm'>{ feature.description }</p>
            </div>
        </div>
    );
}

function FeatureThumbnail({ feature }) {
    return (
        <div className='feature__thumbnail'>
            <img className='feature__img' src={ feature.img } />
        </div>
    );
}

function FeatureShowcase({ feature, textRight }) {
    if (textRight) {
        return (
            <div className='feature'>
                <FeatureThumbnail feature={ feature } />
                <FeatureInfo feature={ feature } />
            </div>
        );
    }
    return (
        <div className='feature'>
            <FeatureInfo feature={ feature } />
            <FeatureThumbnail feature={ feature } />
        </div>
    );
}

export default FeatureShowcase;
