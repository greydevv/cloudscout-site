import React from 'react';
import { Search } from 'components/Icons';

class SearchBar extends React.Component
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
            <div className='search-bar'>
                <button id='player-search-button' onClick={ this.handleSearch }><Search width={24} height={24} /></button>
                <input 
                    type='text' 
                    id='player-search' 
                    placeholder='Search by first, last, institution...' 
                    onKeyDown={ this.updateSearchQuery } 
                    onChange={ this.updateSearchQuery } 
                    name='s' 
                    onSubmit={ this.search } />
            </div>
        );
    }
}

export default SearchBar;
