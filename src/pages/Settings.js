import { useState, useEffect, useCallback } from 'react';
import { useUserContext } from 'UserContext';
import { useApi } from 'api/api';
import { usePut } from 'api/useRest';
import { SpinnerView } from 'components/Spinner';
import Filters, { Dropdown } from 'components/Filters'
import { AdvancedFilters, getFilterObj } from 'components/AdvancedFilters';
import { Button } from 'components/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { prettifyText, isInteger } from 'util/text';
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
    const [ filters, setFilters ] = useState({divisions: [], classes: [], positions: []});
    const [ advancedFilters, setAdvancedFilters ] = useState([]);
    const [ advancedFilterErrors, setAdvancedFilterErrors ] = useState('');
    const [ advancedFilterIndex, setAdvancedFilterIndex ] = useState(0);
    const [ hasUnsaved, setHasUnsaved ] = useState(false);
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { isLoading: isPutLoading, refresh: refreshPut } = usePut(`/v1/users/${userId}`);

    useEffect(() => {
        if (!isUserLoading) {
            setFilters(userJson.account.default_filters);
            setAdvancedFilters(userJson.account.advanced_filters.map((filter, i) => {
                return {index: i, data: filter}
            }));
            setAdvancedFilterIndex(userJson.account.advanced_filters.length);
        }
    }, [isUserLoading]);

    const saveUserSettings = () => {
        if (isPutLoading || !hasUnsaved) {
            return;
        }
        refreshPut({
            ...userJson,
            account: {
                ...userJson.account,
                default_filters: filters,
                advanced_filters: advancedFilters.map((f) => {
                    return {stat: f.data.stat, op: f.data.op, value: f.data.value}
                }),
            }
        });
        setHasUnsaved(false);
    };

    const onFilterChange = (name, values) => {
        setFilters({...filters, [name]: values});
        setHasUnsaved(true);
    };

    const onFilterClear = () => {
        setFilters({divisions: [], classes: [], positions: []});
        setHasUnsaved(true);
    }

    const onRemoveAdvancedFilter = (removeIndex) => {
        setAdvancedFilters(advancedFilters.filter(f => f.index !== removeIndex));
        setHasUnsaved(true);
    }

    const validateAdvancedFilterData = (data, value) => {
        if (!data.stat || !data.op || !value) {
            setAdvancedFilterErrors('All fields are required');
            return false;
        } else if (!isInteger(value)) {
            setAdvancedFilterErrors(`'${value}' is not an integer`);
            return false;
        } else {
            setAdvancedFilterErrors('');
            return true;
        }
    }

    const onChangeAdvancedFilter = (changeIndex, data, value) => {
        let isValid = validateAdvancedFilterData(data, value);
        if (isValid) {
            let filtersCopy = copyObj(advancedFilters);
            filtersCopy[changeIndex] = {
                index: changeIndex,
                data: {
                    stat: data.stat.value,
                    op: data.op.value,
                    value: parseInt(value),
                }
            };
            setAdvancedFilters(filtersCopy);
            setHasUnsaved(true);
        }
    }

    const onAddAdvancedFilter = (data, value) => {
        let isValid = validateAdvancedFilterData(data, value);
        if (isValid) {
            setAdvancedFilters([
                ...advancedFilters,
                {
                    index: advancedFilterIndex,
                    data: {
                        stat: data.stat.value,
                        op: data.op.value,
                        value: parseInt(value),
                    },
                }
            ]);
            setAdvancedFilterIndex(advancedFilterIndex + 1);
            setHasUnsaved(true);
        }
        return isValid;
    }

    return (
        <div className='settings'>
            <div className='page__header mb-md'>
                <h1 className='page__head'>Settings</h1>
            </div>
            { isUserLoading
                ? <SpinnerView />
                : <div className='settings__form__container'>
                      <div className='settings__form__section'>
                          <h5 className='p-body-sm'>Default Filters</h5>
                          <div className='settings__form'>
                              <Filters 
                                  onFilterChange={ onFilterChange } 
                                  onFilterClear = { onFilterClear }
                                  defaultFilters={ filters } 
                              />
                          </div>
                      </div>
                      <div className='settings__form__container'>
                          <h5 className='p-body-sm'>Advanced Filters</h5>
                          <div className='settings__form settings__advanced__filters'>
                              {advancedFilters.map((filter, i) => {
                                  // turn 'general.games_played' into {value:
                                  // 'games_played', label: 'Games Played'}
                                  const statDisplay = filter.data.stat.split('.')[1];
                                  const filterStat = {value: filter.data.stat, label: prettifyText(statDisplay).pretty}
                                  return <AdvancedFilters 
                                      key={ filter.index }
                                      index={ filter.index }
                                      filter={ {...filter.data, stat: filterStat} } 
                                      onChange={ onChangeAdvancedFilter }
                                      onRemove={ onRemoveAdvancedFilter }
                                  />
                              })}
                              <AdvancedFilters 
                                  filter={ {stat: null, op: null, value: ''} }
                                  onAdd={ onAddAdvancedFilter }
                              />
                              {advancedFilterErrors && 
                                  <p className='filters-advanced__new__errors'>{ advancedFilterErrors }</p>
                              }
                          </div>
                      </div>
                      <div className='settings__form__section-submit'>
                          <Button onClick={ saveUserSettings } isDisabled={ isPutLoading || !hasUnsaved }>Save</Button>
                      </div>
                </div>
            }
        </div>
    );
}
