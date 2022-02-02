import Select from 'react-select';
import { prettifyText, isInteger } from 'util/text';
import { copyObj } from 'util/utils';
import { createContext, useState, useContext, useEffect } from 'react';
import { filterOptions, advancedFilterOperators, sportStatOptions } from 'Const';
import './Filters.scss';

export function Dropdown({ placeholder, name, defaults, onChange, options, isMulti, ...rest }) {
    const onChangeWrapper = (filters) => {
        if (isMulti) {
            const values = filters.map(({value}) => {
                return value;
            });
            onChange(name, values);
        } else {
            onChange(name, filters.value);
        }
    }

    const getMappedDefaults = () => {
        return defaults.map((defValue) => {
            return options.find(({value}) => value === defValue);
        });
    }

    const getDefault = () => {
        return options.find(({value}) => value === defaults);
    }

    return (
        <Select 
            value={ isMulti ? getMappedDefaults() : getDefault() }
            onChange={ onChangeWrapper }
            placeholder={ placeholder } 
            options={ options }
            classNamePrefix='dropdown'
            isMulti={ isMulti }
            { ...rest }
        />
    );
}

export function FilterSection({ children, onChange }) {
    return (
        <div className='filters'>
            { children }
        </div>
    );
}

export default function Filters({ onFilterChange, onFilterClear, defaultFilters, showClear }) {
    const [filters, setFilters] = useState(defaultFilters);

    const onFilterChangeWrapper = (name, newValues) => {
        setFilters({
            ...filters,
            [name]: newValues,
        });
        onFilterChange(name, newValues);
    }

    const onFilterClearWrapper = () => {
        let clearedFilters = Object.fromEntries(
            Object.entries(defaultFilters).map(([key]) => [key, []])
        );
        setFilters(clearedFilters);
        onFilterClear();
    }

    useEffect(() => {
        setFilters(defaultFilters);
    }, [defaultFilters]);

    let isClearDisabled = true;
    const filterValues = Object.values(filters).flat(1);
    for (const v of Object.values(filters)) {
        if (v.length > 0) {
            isClearDisabled = false;
        }
    }

    return (
        <FilterSection>
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.divisions }
                placeholder='Division' 
                name='divisions' 
                options={ filterOptions.divisions } 
                isMulti
            />
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.positions }
                placeholder='Position' 
                name='positions' 
                options={ filterOptions.positions } 
                isMulti
            />
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.classes }
                placeholder='Class' 
                name='classes' 
                options={ filterOptions.classes } 
                isMulti
            />
            <button 
                type='button'
                className={ 'px-sm filters__btn-clear' + (isClearDisabled ? '-disabled' : '')} 
                onClick={ onFilterClearWrapper }
                disabled={ isClearDisabled }
            >
                Clear
            </button>
        </FilterSection>
    );
}
