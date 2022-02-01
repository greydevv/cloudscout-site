import { useState, useEffect, useCallback } from 'react';
import { useUserContext } from 'UserContext';
import { useApi, usePut } from 'api/api';
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
    const [ jsonBody, setJsonBody ] = useState({});
    const [userState, setUserState] = useState({
        first: '', last: '', institution: '', 
        defaultFilters: {divisions: [], classes: [], positions: []},
        advancedFilters: [],
    });
    const { json: userJson, isLoading: isUserLoading } = useApi(`/v1/users/${userId}`);
    const { json: putJson, isLoading: isPutLoading } = usePut(`/v1/users/${userId}`, jsonBody);

    const [ advancedFilters, setAdvancedFilters ] = useState([]);
    const [ advancedFilterErrors, setAdvancedFilterErrors ] = useState('');
    const [ filterIndex, setFilterIndex ] = useState(0);

    useEffect(() => {
        if (!isUserLoading) {
            setUserState({
                first: userJson.meta.first,
                last: userJson.meta.last,
                institution: userJson.meta.institution,
                defaultFilters: userJson.account.default_filters,
                // advancedFilters: userJson.account.advanced_filters
            });
            setJsonBody(copyObj(userJson));
            setAdvancedFilters(userJson.account.advanced_filters.map((filter, i) => {
                return {index: i, data: filter}
            }));
            setFilterIndex(userJson.account.advanced_filters.length);
        }
    }, [isUserLoading]);

    const saveUserSettings = () => {
        userJson.meta.first = userState.first;
        userJson.meta.last = userState.last;
        userJson.meta.institution = userState.institution;
        userJson.account.default_filters = userState.defaultFilters;
        userJson.account.advanced_filters = advancedFilters.map((f) => {
            return {stat: f.data.stat, op: f.data.op, value: f.data.value};
        });
        // userJson.account.advanced_filterss = userState.advancedFilters;
        if (JSON.stringify(userJson) !== JSON.stringify(jsonBody)) {
            setJsonBody(copyObj(userJson));
        }
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

    const onRemoveAdvancedFilter = (removeIndex) => {
        setAdvancedFilters(advancedFilters.filter(f => f.index !== removeIndex));
        setUserState({
            ...userState,
            advancedFilters: copyObj(advancedFilters),
        });
    }

    const onAddAdvancedFilter = (data, value) => {
        if (!data.stat || !data.op || !value) {
            setAdvancedFilterErrors('All fields are required');
        } else if (!isInteger(value)) {
            setAdvancedFilterErrors(`'${value}' is not an integer`);
        } else {
            setAdvancedFilterErrors('');
            setAdvancedFilters([
                ...advancedFilters,
                {
                    index: filterIndex,
                    data: {
                        stat: data.stat.value,
                        op: data.op.value,
                        value: parseInt(value),
                    },
                }
            ]);
            setFilterIndex(filterIndex + 1);
            // OK, return true for AdvancedFilters component
            return true;
        }
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
                                  defaultFilters={ userState.defaultFilters } 
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
                                      key={ i }
                                      index={ filter.index || i }
                                      filter={ {...filter.data, stat: filterStat} } 
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
                          <Button onClick={ saveUserSettings }>Save</Button>
                      </div>
                </div>
            }
        </div>
    );
}

// export default function Settings() {
//     const [ filters, setFilters ] = useState([]);
//     const [ filterIndex, setFilterIndex ] = useState(0);

//     const onRemoveAdvancedFilter = (removeIndex) => {
//         setFilters(filters.filter(f => f.index !== removeIndex));
//     }

//     const onAddAdvancedFilter = (data) => {
//         setFilters([
//             ...filters,
//             {
//                 index: filterIndex,
//                 data: copyObj(data),
//             }
//         ]);
//         setFilterIndex(filterIndex + 1);
//     }

//     return (
//         <div className='settings'>
//             <div className='page__header mb-md'>
//                 <h1 className='page__head'>Settings</h1>
//             </div>
//         </div>
//     )
// }
