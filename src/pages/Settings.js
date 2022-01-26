import { useState, useEffect, useCallback } from 'react';
import { useUserContext } from 'UserContext';
import { useApi, usePut } from 'api/api';
import { SpinnerView } from 'components/Spinner';
import Filters, { Dropdown } from 'components/Filters'
import { Button } from 'components/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { copyObj } from 'util/utils';
import { sportOptions } from 'Const';
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
    const [userState, setUserState] = useState({
        first: '', last: '', institution: '', 
        defaultFilters: {divisions: [], classes: [], positions: []}
    });
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);

    useEffect(() => {
        if (!isUserLoading) {
            setUserState({
                first: userJson.meta.first,
                last: userJson.meta.last,
                institution: userJson.meta.institution,
                defaultFilters: userJson.account.default_filters
            });
            setJsonBody(copyObj(userJson));
        }
    }, [isUserLoading]);

    const saveUserSettings = (e) => {
        console.log('saving settings');
        userJson.meta.first = userState.first;
        userJson.meta.last = userState.last;
        userJson.meta.institution = userState.institution;
        userJson.account.default_filters = userState.defaultFilters;
        if (JSON.stringify(userJson) !== JSON.stringify(jsonBody)) {
            setJsonBody(copyObj(userJson));
        }
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setUserState({...userState, [name]: value});
    };

    const onFilterChange = (name, values) => {
        setUserState({
            ...userState,
            defaultFilters: {
                ...userState.defaultFilters,
                [name]: values
            }
        });
    };

    const onFilterClear = () => {
        setUserState({
            ...userState,
            defaultFilters: {divisions: [], classes: [], positions: []}
        })
    }

    return (
        <div className='settings'>
            <div className='page__header mb-md'>
                <h1 className='page__head'>Settings</h1>
            </div>
            { isUserLoading
                ? <SpinnerView />
                : <div className='settings__form__container'>
                      <form className='settings__form' onSubmit={ saveUserSettings }>
                          {/*<SettingsField 
                              labelText='First' 
                              name='first'
                              defaultValue={ userState.first }
                              onChange={ handleInputChange }
                          />
                          <SettingsField 
                              labelText='Last' 
                              name='last'
                              defaultValue={ userState.last }
                              onChange={ handleInputChange }
                          />
                          <SettingsField 
                              labelText='Institution' 
                              name='institution'
                              defaultValue= { userState.institution }
                              onChange={ handleInputChange }
                          />*/}
                          <div className='settings__form__section'>
                              <h5 className='p-body-sm'>Default Filters</h5>
                              <Filters 
                                  onFilterChange={ onFilterChange } 
                                  onFilterClear = { onFilterClear }
                                  defaultFilters={ userState.defaultFilters } 
                              />
                          </div>
                          <div className='settings__form__section'>
                              <h5 className='p-body-sm'>Sport</h5>
                              <Dropdown
                                  placeholder='Sport'
                                  name='sport'
                                  defaults={[]}
                                  onChange={ (value) => console.log('changed sport to', value) }
                                  options={ sportOptions }
                              />
                          </div>
                          <div className='settings__form__section-submit'>
                              <Button type='submit'>Save</Button>
                          </div>
                    </form>
                </div>
            }
        </div>
    );
}
