import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi }  from 'api/api.js';
import BasePlayer from '../models/Player';
import { SpinnerView } from 'components/Spinner';
import prettifyText from 'util/TextHelper';
import './PlayerProfile.scss';

export default function PlayerProfile() {
    const { pid } = useParams()
    const { json, isLoading } = useApi(`v1/players/${pid}`);
    const [currentTab, setCurrentTab] = useState('general');

    if (isLoading) {
        return(
            <SpinnerView />
        );
    }

    const changeCurrentTab = (category) => {
        console.log('set');
        setCurrentTab(category);
    };

    const statTabs = json.stats;
    const inputJson = statTabs[currentTab];
    return (
        <>
            <div className='profile'>
                <div className='page__header'>
                    <h1 className='page__head'>{ `${json.meta.first.toUpperCase()} ${json.meta.last.toUpperCase()}` }</h1>
                    <p className='p-body-sm'>{ json.meta.institution.toUpperCase() } • { json.meta.position }</p>
                    <div className='profile__categories'>
                        {Object.keys(statTabs).map((category, i) => {
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
                        { Object.entries(inputJson).map(([key, value], i) => {
                            return (
                                <tr key={ i } className='profile__statistics__row'>
                                    <td>
                                        <h4 className='stat__name my-auto'>{ prettifyText(key).pretty }</h4>
                                    </td>
                                    <td>
                                        <h4 className='stat__value my-auto'>{ value || '-' }</h4>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
}
