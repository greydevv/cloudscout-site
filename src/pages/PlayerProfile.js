import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi }  from 'api/api.js';
import BasePlayer from 'models/Player';
import { SpinnerView } from 'components/Spinner';
import prettifyText from 'util/TextHelper';
import { ArrowUp, ArrowDown } from 'components/Icons'
import './PlayerProfile.scss';

function StatRow({ stat, value, classAvgStat, allAvgStat }) {
    const nullify = (allAvgStat === null || allAvgStat === 0.0 || value === null);
    const isPositive = value > allAvgStat;
    const pct = (nullify) ? null : parseInt((100 * (value - allAvgStat)) / allAvgStat);
    const pctText = (pct === null || (pct < 1 && pct > 0)) ? '-' : `${Math.abs(parseInt(pct))}%`;

    const getArrow = () => {
        return (isPositive ? <ArrowUp /> : <ArrowDown />);
    }
    
    return (
        <tr className='stat__row'>
            <td className='stat__col'>
                <h4 className='stat__name my-auto'>{ prettifyText(stat).pretty }</h4>
            </td>
            <td className='stat__col'>
                <p className='stat__metric__text'>{ value === null ? '-' : value }</p>
            </td>
            <td className='stat__col'>
                {/*<p className='stat__metric__name p-body-sm'>All</p>*/}
                <div className={'stat__metric' + (nullify ? '' : (isPositive ? '-positive' : '-negative'))}>
                    { !nullify && getArrow() }
                    <p className='stat__metric__text'>{ pctText }</p>
                </div>
            </td>
        </tr>
    );
}

export default function PlayerProfile() {
    const { pid } = useParams()
    const { json, isLoading } = useApi(`v1/players/${pid}`);

    const makePosition = (position) => {
        if (position === null) {
            return '';
        }
        return `?position=${position}`;
    }

    const position = isLoading ? '' : json.meta.position;
    const { json: averageJson, isLoading: isAverageLoading } = useApi(`v1/analysis${makePosition(position)}`, true, false);
    const [currentTab, setCurrentTab] = useState('general');

    const changeCurrentTab = (category) => {
        setCurrentTab(category);
    };

    if (isLoading || isAverageLoading) {
        return <SpinnerView />
    }

    const statTabs = json.stats;
    const inputJson = statTabs[currentTab];

    return (
        <>
            <div className='profile'>
                <div className='page__header'>
                    <h1 className='page__head'>{ `${json.meta.first.toUpperCase()} ${json.meta.last.toUpperCase()}` }</h1>
                    <p className='p-body-sm'>{ json.meta.institution.toUpperCase() } { json.meta.position !== null && `• ${json.meta.position}`}</p>
                    <div className='profile__categories'>
                        { Object.keys(statTabs).map((category, i) => {
                            const isCurrentCategory = category === currentTab;
                            return (
                                <div key={ i } className={ isCurrentCategory ? 'profile__categories__tab-active' : 'profile__categories__tab'}>
                                    <a
                                        className={ 'p-body-sm profile__categories__link' + (isCurrentCategory ? '-active' : '') }
                                        onClick={() => changeCurrentTab(category)}
                                    >
                                        { category.toUpperCase() }
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='profile__statistics__container py-lg'>
                    <table className='profile__statistics__table'>
                        <tbody>
                            { Object.entries(inputJson).map(([stat, value], i) => {
                                return (
                                    <StatRow 
                                        key={ i } 
                                        stat={ stat } 
                                        value={ value } 
                                        allAvgStat={ averageJson[currentTab][stat] } 
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
