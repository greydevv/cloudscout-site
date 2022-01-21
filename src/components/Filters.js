import { createContext, useContext, useEffect } from 'react';
import Select from 'react-select';
import { filterOptions } from 'Const';
import './Filters.scss';

/*
 * FIND A BETTER WAY TO DO THIS STYLING SHIT USING GLOBAL SASS VARIABLES
 */
const filterStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        backgroundColor: 'none',
        '&:hover': {
            backgroundColor: '#dbe5f2'
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: '#f4f4f4',
        border: 0,
        boxShadow: '0 5px 8px #1a212950',
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#e1e5eb',
        borderWidth: '2px',
        borderColor: state.isFocused ? '#177bf2' : '#e1e5eb',
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#177bf2' : '#c5d1e5'
        }
    }),
    group: (provided, state) => ({
        ...provided,
        backgroundColor: '#177bf2',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: 500
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        '&:hover': {
            color: '#1a2129'
        }
    }),
    indicatorSeparator: (provided, state) => ({
        display: 'none'
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#1a2129',
        color: '#f4f4f4'
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: '#f4f4f4'
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: '#1a2129',
        '&:hover': {
            backgroundColor: '#1a2129',
            color: '#f85c56'
        }
    })
}

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
            styles={ filterStyles } 
            onChange={ onChangeWrapper }
            placeholder={ placeholder } 
            options={ options }
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

export default function Filters({ onFilterChange, defaultFilters }) {
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
        </FilterSection>
    );
}
