import { createContext, useContext, useEffect } from 'react';
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
    return (
        <FilterSection>
            <Dropdown 
                onChange={ onFilterChange } 
                defaults={ defaultFilters.division }
                placeholder='Division' 
                name='division' 
                options={ filterOptions.divisions } 
            />
            <Dropdown 
                onChange={ onFilterChange } 
                defaults={ defaultFilters.class }
                placeholder='Class' 
                name='class' 
                options={ filterOptions.classes } 
            />
            <Dropdown 
                onChange={ onFilterChange } 
                defaults={ defaultFilters.position }
                placeholder='Position' 
                name='position' 
                options={ filterOptions.positions } 
            />
            {showClear &&
                <button className='filters__clear' onClick={ onFilterClear }>Clear</button>
            }
        </FilterSection>
    );
}
