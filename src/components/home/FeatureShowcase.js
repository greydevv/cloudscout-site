import './FeatureShowcase.scss';

function FeatureShowcase(props) {
    const feature = props.feature
    return (
        <div className='feature'>
            <div className='feature-meta w-80'>
                <h3 className='h3-left'>{ feature.name }</h3>
                <h1 className='feature-hook'>{ feature.hook }</h1>
                <p className='feature-descrip'>{ feature.description }</p>
            </div>
            <div className='feature-thumbnail'>
                <img alt={ feature.imgAlt } src={ feature.img } />
            </div>
        </div>
    );
}


export default FeatureShowcase;
