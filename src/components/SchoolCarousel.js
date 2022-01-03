import './SchoolCarousel.scss';

function SchoolCarousel({ schools }) {
    return (
        <div className='school__carousel__container p-md'>
            <div className='school__carousel__container__inner mx-auto'>
                {schools.map((school, i) => {
                    return (
                        <div key={ i } className='school__img__container'>
                            { school }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SchoolCarousel;
