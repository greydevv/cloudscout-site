import React from 'react';
import { Search } from 'components/Icons';
import './SearchBar.scss';

export default class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.handleClick = props.handleClick;
        this.handleSearch = this.handleSearch.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.state = {
            query: ''
        }
    }

    updateSearchQuery(e) {
        this.setState({query:e.target.value});
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleSearch() {
        this.props.handleSearch(this.state.query);
    }

    render() {
        return (
            <div className='search__bar'>
                <button className='search__btn my-auto p-0 mr-xs' onClick={ this.handleSearch }>
                    <Search className='search__btn__icon'/>
                </button>
                <input
                    type='text'
                    className='search__input p-0 my-auto'
                    placeholder='Search by first, last, institution...'
                    onKeyDown={ this.updateSearchQuery }
                    onChange={ this.updateSearchQuery }
                    name='s'
                    onSubmit={ this.search }
                />
            </div>
        );
    }
}
