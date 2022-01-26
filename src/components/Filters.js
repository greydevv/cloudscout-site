import { createContext, useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { filterOptions } from 'Const';
import './Filters.scss';

export function Dropdown({ placeholder, name, defaults, onChange, options, ...rest }) {
    const onChangeWrapper = (filters) => {
        const values = filters.map(({value}) => {
            return value;
        });
        onChange(name, values);
    }

    const getMappedDefaults = () => {
        return defaults.map((defValue) => {
            return options.find(({value}) => value === defValue);
        });
    }

    return (
        <Select 
            value={ getMappedDefaults() }
            onChange={ onChangeWrapper }
            placeholder={ placeholder } 
            options={ options }
            classNamePrefix='dropdown'
            isMulti
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

    return (
        <FilterSection>
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.divisions }
                placeholder='Division' 
                name='divisions' 
                options={ filterOptions.divisions } 
            />
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.classes }
                placeholder='Class' 
                name='classes' 
                options={ filterOptions.classes } 
            />
            <Dropdown 
                onChange={ onFilterChangeWrapper } 
                defaults={ filters.positions }
                placeholder='Position' 
                name='positions' 
                options={ filterOptions.positions } 
            />
            <button 
                type='button'
                className='filters__clear px-sm' 
                onClick={ onFilterClearWrapper }
            >
                Clear
            </button>
        </FilterSection>
    );
}
