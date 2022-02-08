import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUp, ArrowDown, StarFilled } from 'components/Icons'
import { SpinnerView } from 'components/Spinner';
import { BackButton, ToggleButton } from 'components/Button';
import { useUserContext } from 'UserContext';
import { copyObj } from 'util/utils';
import { prettifyText } from 'util/text';
// import { useApi, usePut }  from 'api/api';
import { useRest, usePut } from 'api/useRest';
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
    const userId = useUserContext();
    const { pid } = useParams()
    const [currentTab, setCurrentTab] = useState('general');
    const [ isFavorited, setIsFavorited ] = useState(false);
    const { json: userJson, isLoading: isUserLoading } = useRest({url: `v1/users/${userId}`});
    const { json: playerJson, isLoading: isPlayerLoading } = useRest({url: `v1/players/${pid}`});
    const { json: averageJson, isLoading: isAverageLoading, refresh: refreshAverage } = useRest({url: 'v1/analysis'}, false);
    const { refresh: refreshPut } = usePut(`v1/users/${userId}`);

    useEffect(() => {
        if (!isUserLoading && userJson.account.favorites.includes(pid)) {
            setIsFavorited(true);
        }
    }, [isUserLoading]);

    useEffect(() => {
        if (!isPlayerLoading) {
            refreshAverage({
                position: playerJson.meta.position,
                sport: playerJson.meta.sport
            });
        }
    }, [isPlayerLoading])

    const changeCurrentTab = (category) => {
        setCurrentTab(category);
    };

    const onFavorite = () => {
        const newFavorites = [...userJson.account.favorites, pid];
        refreshPut({
            ...userJson,
            account: {
                ...userJson.account,
                favorites: newFavorites
            }
        });
        setIsFavorited(true);
    }

    const onUnfavorite = () => {
        let newFavorites = userJson.account.favorites;
        for (var i = newFavorites.length - 1; i >= 0; i--) {
            if (newFavorites[i] === pid) {
                newFavorites.splice(i, 1);
                break;
            }
        }
        refreshPut({
            ...userJson,
            account: {
                ...userJson.account,
                favorites: newFavorites
            }
        });
        setIsFavorited(false);
    }

    if (isPlayerLoading || isUserLoading || isAverageLoading) {
        return <SpinnerView />
    }

    const statTabs = playerJson.stats;
    const hasNoStats = Object.keys(averageJson).length === 0;
    const inputJson = hasNoStats ? null : statTabs[currentTab];

    return (
        <>
            <div className='profile'>
                <BackButton />
                <div className='page__header'>
                    <h1 className='page__head'>{ `${playerJson.meta.first.toUpperCase()} ${playerJson.meta.last.toUpperCase()}` } </h1>
                    <p className='p-body-sm'>{ playerJson.meta.institution.toUpperCase() } { playerJson.meta.position !== null && `• ${playerJson.meta.position}`} </p>
                    <div className='my-sm'>
                        <ToggleButton 
                            icon={ <StarFilled /> } 
                            text='Favorite' 
                            onChange={ isFavorited ? onUnfavorite : onFavorite } 
                            isActive={ isFavorited }
                        />
                    </div>
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
                                        {Object.entries(inputJson).map(([stat, value], i) => {
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
