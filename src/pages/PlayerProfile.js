import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi }  from 'api/api.js';
import BasePlayer from '../models/Player';
import { SpinnerView } from 'components/Spinner';
import prettifyText from 'util/TextHelper';

export default function PlayerProfile() {
    const {pid} = useParams()
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

    var inputJson = statTabs[currentTab];
    return (
        <>
            {Object.keys(statTabs).map((category, i) => {
                return <a
                    key={ i }
                    href='#'
                    style={(category === currentTab) ? {fontWeight: '700', margin: '1rem'} : {fontWeight: '500', margin: '1rem'} } //temp
                    onClick={() => changeCurrentTab(category)}
                >
                    {category}
                </a>
            })}
            <div>
                { Object.entries(inputJson).map(([key, value], i) => {
                    return (
                        <div key={i}>
                            <h4>{ prettifyText(key).pretty }</h4>
                            <h6>{ value }</h6>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
