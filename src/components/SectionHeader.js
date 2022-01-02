import './SectionHeader.scss'

function SectionHeader({headText, subText}) {
    return (
        <div className='section__header mb-xl'>
            {headText &&
                <h2 className='section__head'>{ headText }</h2>
            }
            {subText &&
                <p className='p-body-sm'>{ subText }</p>
            }
        </div>
    );
    
}

export default SectionHeader;
