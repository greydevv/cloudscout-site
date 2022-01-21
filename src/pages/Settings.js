import { useState, useEffect, useCallback } from 'react';
import { useUserContext } from 'UserContext';
import { useApi, usePut } from 'api/api';
import { SpinnerView } from 'components/Spinner';
import Filters from 'components/Filters'
import { Button } from 'components/Button';
import { useAuth0 } from '@auth0/auth0-react';
import './Settings.scss';

function SettingsField({ labelText, ...rest }) {
    return (
        <div className='mb-md'>
            <h5 className='p-body-sm'>{ labelText }</h5>
            <input
                type='text' 
                className='settings__form__field__input' 
                { ...rest }
            />
        </div>
    );
}

export default function Settings() {
    const userId = useUserContext();
    const [ jsonBody, setJsonBody ] = useState({});
    const [userData, setUserData] = useState({
        first: '', last: '', institution: '', 
        defaultFilters: {division: [], class: [], position: []}
    });
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);

    const copyObj = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    };

    useEffect(() => {
        if (!isUserLoading) {
            setUserData({
                first: userJson.meta.first,
                last: userJson.meta.last,
                institution: userJson.meta.institution,
                defaultFilters: {
                    division: userJson.account.default_filters.division,
                    class: userJson.account.default_filters.class,
                    position: userJson.account.default_filters.position
                }
            });
            setJsonBody(copyObj(userJson));
        }
    }, [isUserLoading]);

    const saveUserSettings = (e) => {
        userJson.meta.first = userData.first;
        userJson.meta.last = userData.last;
        userJson.meta.institution = userData.institution;
        userJson.account.default_filters = userData.defaultFilters;
        if (JSON.stringify(userJson) !== JSON.stringify(jsonBody)) {
            setJsonBody(copyObj(userJson));
        }
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setUserData({...userData, [name]: value});
    };

    const onFilterChange = (name, values) => {
        setUserData({
            ...userData,
            defaultFilters: {
                ...userData.defaultFilters,
                [name]: values
            }
        });
    };

    return (
        <div className='settings'>
            <div className='page__header'>
                <h1 className='page__head'>Settings</h1>
            </div>
            { isUserLoading
                ? (
                    <SpinnerView />
                )
                : (
                    <>
                        <div className='settings__form__container'>
                            <form className='settings__form' onSubmit={ saveUserSettings }>
                                <SettingsField 
                                    labelText='First' 
                                    name='first'
                                    defaultValue={ userData.first }
                                    onChange={ handleInputChange }
                                />
                                <SettingsField 
                                    labelText='Last' 
                                    name='last'
                                    defaultValue={ userData.last }
                                    onChange={ handleInputChange }
                                />
                                <SettingsField 
                                    labelText='Institution' 
                                    name='institution'
                                    defaultValue= { userData.institution }
                                    onChange={ handleInputChange }
                                />
                                <div>
                                    <h5 className='p-body-sm'>Default Filters</h5>
                                    <Filters onFilterChange={ onFilterChange } defaultFilters={ userData.defaultFilters } />
                                </div>
                                <div className='mt-xxl'>
                                <Button type='submit'>Save</Button>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </div>
    );
}
