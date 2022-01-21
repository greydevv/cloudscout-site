import { useState, useEffect } from 'react';
import { useUserContext } from 'UserContext';
import { useApi, usePut } from 'api/api';
import { SpinnerView } from 'components/Spinner';
import { Button } from 'components/Button';
import User from 'models/User';
import { useAuth0 } from '@auth0/auth0-react';
import './Pages.scss';

function SettingsField({ labelText, ...rest }) {
    return (
        <div className='field__container'>
            <h5>{ labelText }</h5>
            <input
                type='text' 
                className='field__input' 
                { ...rest }
            />
        </div>
    );
}

export default function Settings() {
    const userId = useUserContext();
    const { json: userJson,
            isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const [ jsonBody, setJsonBody ] = useState({});
    const { json: putJson, 
            isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);
    const [userData, setUserData] = useState({first: '', last: '', institution: ''});

    const copyObj = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    };

    useEffect(() => {
        if (!isUserLoading) {
            setUserData({
                first: userJson.meta.first,
                last: userJson.meta.last,
                institution: userJson.meta.institution,
            });
            setJsonBody(copyObj(userJson));
        }
    }, [isUserLoading]);

    const saveUserSettings = (e) => {
        userJson.meta.first = userData.first;
        userJson.meta.last = userData.last;
        userJson.meta.institution = userData.institution;
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
                        <form onSubmit={ saveUserSettings }>
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
                            <Button type='submit'>Save</Button>
                        </form>
                    </>
                )
            }
        </div>
    );
}
