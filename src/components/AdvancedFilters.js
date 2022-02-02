import { useState, useCallback } from 'react';
import Select from 'react-select';
import { advancedFilterOperators, sportStatOptions } from 'Const';
import { prettifyText } from 'util/text';
import { CloseSmall, PlusSmall } from 'components/Icons';
import './Filters.scss';

export function AdvancedFilters({ index, filter, onChange, onRemove, onAdd}) {
    const [data, setData] = useState({
        stat: filter.stat,
        op: advancedFilterOperators[filter.op]
    });
    const [value, setValue] = useState(filter.value);

    const onAddWrapper = () => {
        const addResultSuccess = onAdd(data, value);
        if (addResultSuccess) {
            setData({stat: null, op: null});
            setValue('');
        }
    }

    const onChangeFilter = (name, newFilter) => {
        let newData = {...data, [name]: newFilter}
        if (onChange) {
            onChange(index, newData, value);
        }
        setData(newData);
    }

    const onChangeValue = (e) => {
        let newValue = e.target.value;
        if (onChange) {
            onChange(index, data, newValue);
        }
        setValue(newValue);
    }

    const makeStatOptions = useCallback((options) => {
        // this isn't really efficient
        return Object.keys(options).map((category) => {
            return options[category].map((opt) => {
                return {value: `${category}.${opt}`, label: prettifyText(opt).pretty}
            });
        }).flat(1);
    }, []);

    return <div className='filters-advanced__row'>
        <div className='filters-advanced__row__items'>
            {onRemove && 
                <button type='button' 
                    className='my-auto filters-advanced__btn-remove' 
                    onClick={ () => onRemove(index) }
                ><CloseSmall className='filters-advanced__btn-remove__icon' /></button>
            }
            {onAdd && 
                <button 
                    type='button' 
                    className='my-auto filters-advanced__btn-add' 
                    onClick={ onAddWrapper } 
                ><PlusSmall className='filters-advanced__btn-add__icon' /></button>
            }
            <Select 
                classNamePrefix='dropdown-advanced'
                value={ data.stat }
                onChange={ (filter) => onChangeFilter('stat', filter) } 
                options={ makeStatOptions(sportStatOptions.football) } 
            />
            <Select 
                classNamePrefix='dropdown-advanced'
                value={ data.op }
                onChange={ (filter) => onChangeFilter('op', filter) } 
                options={ Object.values(advancedFilterOperators) } 
            />
            <input 
                value={ value } 
                type='text' 
                onChange={ onChangeValue } 
                className='filters-advanced__input' 
                placeholder='value' 
            />
        </div>
    </div>
}
