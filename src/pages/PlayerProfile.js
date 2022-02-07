import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUp, ArrowDown, StarFilled } from 'components/Icons'
import { SpinnerView } from 'components/Spinner';
import { BackButton } from 'components/Button';
import { useUserContext } from 'UserContext';
import { copyObj } from 'util/utils';
import { prettifyText } from 'util/text';
import { useApi, usePut }  from 'api/api';
import './PlayerProfile.scss';

function StatRow({ stat, value, classAvgStat, allAvgStat }) {
    const nullify = (allAvgStat === null || allAvgStat === 0 || value === null || value === 0);
    const isPositive = value > allAvgStat;
    const pct = (nullify) ? null : parseInt((100 * (value - allAvgStat)) / allAvgStat);
    const pctText = (pct === null || (pct < 1 && pct > 0)) ? 'N/A' : `${Math.abs(parseInt(pct))}%`;

    const getArrow = () => {
        return (isPositive ? <ArrowUp /> : <ArrowDown />);
    }
    
    return (
        <tr className='stat__row'>
            <td className='stat__col'>
                <h4 className='stat__name my-auto'>{ prettifyText(stat).pretty }</h4>
            </td>
            <td className='stat__col'>
                <p className='stat__metric__text'>{ value === null ? 'N/A' : value }</p>
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

function NoStats() {
    return (
        <div className='profile__statistics__container-nodata'>
            <p className='profile__statistics__container-nodata__text'>No stats</p>
        </div>
    );
}

export default function PlayerProfile() {
    const { pid } = useParams()
    const { json, isLoading } = useApi(`v1/players/${pid}`);
    const userId = useUserContext();
    const [ jsonBody, setJsonBody ] = useState({});
    const { json: userJson, isLoading: isUserLoading } = useApi(`v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody)

    const makePosition = (position) => {
        if (position === null) {
            return '';
        }
        return `?position=${position}`;
    }

    const sport = isLoading ? '' : json.meta.sport;
    const position = isLoading ? '' : json.meta.position;
    const { json: averageJson, isLoading: isAverageLoading } = useApi(`v1/analysis${makePosition(position)}&sport=${sport}`, position !== null, false);
    const [currentTab, setCurrentTab] = useState('general');

    useEffect(() => {
        if (!isUserLoading) {
            setJsonBody(copyObj(userJson));
        }
    }, [isUserLoading]);

    const changeCurrentTab = (category) => {
        setCurrentTab(category);
    };

    const onFavorite = (pid) => {
        userJson.account.favorites = [...userJson.account.favorites, pid];
        setJsonBody(copyObj(userJson));
    }

    const onUnfavorite = (pid) => {
        let newFavorites = jsonBody.account.favorites;
        for (var i = newFavorites.length - 1; i >= 0; i--) {
            if (newFavorites[i] === pid) {
                newFavorites.splice(i, 1);
                break;
            }
        }
        userJson.account.favorites = newFavorites;
        setJsonBody(copyObj(userJson));
    }

    if (isLoading || isUserLoading || (isAverageLoading && position !== null)) {
        return <SpinnerView />
    }
    
    const isFavorited = userJson.account.favorites.includes(json.pid);
    const statTabs = json.stats;

    const hasNoStats = Object.keys(averageJson).length === 0;
    const inputJson = hasNoStats ? null : statTabs[currentTab];

    return (
        <>
            <div className='profile'>
                <BackButton />
                <div className='page__header'>
                    <h1 className='page__head'>{ `${json.meta.first.toUpperCase()} ${json.meta.last.toUpperCase()}` } </h1>
                    <p className='p-body-sm'>{ json.meta.institution.toUpperCase() } { json.meta.position !== null && `• ${json.meta.position}`} </p>
                    {isFavorited
                        ? (<button className='favorite__btn-active' onClick={ () => onUnfavorite(json.pid) }>
                               <StarFilled className='favorite__btn__icon-active' />
                           </button>)
                        : (<button className='favorite__btn' onClick={ () => onFavorite(json.pid) }>
                               <StarFilled className='favorite__btn__icon' />
                           </button>)
                    }
                </div>
                {hasNoStats
                    ? <NoStats />
                    : (
                        <>
                            <div className='profile__categories'>
                                { Object.keys(statTabs).map((category, i) => {
                                    const isCurrentCategory = category === currentTab;
                                    return (
                                        <div key={ i } className={ isCurrentCategory ? 'profile__categories__tab-active' : 'profile__categories__tab'}>
                                            <a
                                                className={ 'p-body-sm profile__categories__link' + (isCurrentCategory ? '-active' : '') }
                                                onClick={() => changeCurrentTab(category) }
                                            >
                                                { category.toUpperCase() }
                                            </a>
                                        </div>
                                    );
                                })}
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
                        </>
                    )
                }
            </div>
        </>
    );
}
