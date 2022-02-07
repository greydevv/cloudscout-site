import { useState } from 'react';
import { Search } from 'components/Icons';
import './SearchBar.scss';

export default function SearchBar({ onSearch }) {
    const [ query, setQuery ] = useState('');

    const updateSearchQuery = (e) => {
        setQuery(e.target.value);
        if (e.key === 'Enter') {
            onSearch(query);
        }
    }

    return (
        <div className='search__bar'>
            <button className='search__btn my-auto p-0 mr-xs' onClick={ () => onSearch(query) }>
                <Search className='search__btn__icon'/>
            </button>
            <input
                type='text'
                className='search__input p-0 my-auto'
                placeholder='Search by first, last, institution...'
                onKeyDown={ updateSearchQuery }
                onChange={ updateSearchQuery }
                name='s'
                onSubmit={ () => onSearch(query) }
            />
        </div>
    );
}
