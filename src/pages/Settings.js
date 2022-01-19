import { useState } from 'react';
import { useUserContext } from 'UserContext';
import { useApi } from 'api/api';
import { SpinnerView } from 'components/Spinner';
import { Button } from 'components/Button';
import User from 'models/User';
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
    const [user, setUser] = useState(null);
    const { json, isLoading } = useApi(`v1/users/${userId}`);

    return (
        <div className='settings'>
            <div className='page__header'>
                <h1 className='page__head'>Settings</h1>
            </div>
            { isLoading
                ? (
                    <SpinnerView />
                )
                : (
                    <>
                        <SettingsField 
                            labelText='First' 
                            defaultValue={ user.first }
                        />
                        <SettingsField 
                            labelText='Last' 
                            defaultValue={ user.last }
                        />
                        <SettingsField 
                            labelText='Institution' 
                            defaultValue= { user.institution }
                        />
                        <Button>Save</Button>
                    </>
                )
            }
        </div>
    );
}
