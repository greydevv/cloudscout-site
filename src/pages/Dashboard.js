import React from 'react';
import SearchBar from '../components/SearchBar';
import PlayerTable from '../components/PlayerTable';
import BasePlayer from '../models/Player';
import Filter from '../components/Filters';
import { playerData } from 'Const.js';
import './Pages.scss';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            json: [],
            divisions: null,
            classes: null,
            positions: null
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSearch(this.state.query);
    }

    handleSearch(query) {
        /*
        this.getPlayers(query).then(result => this.setState({
            json: result.map(BasePlayer.fromJson)
        }))
        */
    }

    handleFilterChange(divisions, classes, positions) {
        /*
        let filterString = this.buildRequestFilterString(divisions, classes, positions);
        this.getPlayers(this.state.query, filterString).then(result => this.setState({
            json: result.map(BasePlayer.fromJson)
        }));
        */
    }

    buildRequestFilterString(divisions, classes, positions) {
        var filterString = '';
        console.log("buildRequestFilterString has these variables: ", divisions, classes, positions);
        if (divisions != null) {
            filterString += '&division=' + divisions;
        }
        if (classes != null)
        {
            filterString += '&year=' + classes;
        }
        if (positions != null) {
            filterString += '&position=' + positions;
        }
        console.log('FILTER STRING: ' + filterString);
        return filterString;
    }

    async getPlayers(query, filterString) {
        /*
        query = '?q=' + query.replaceAll(' ', '+');
        URL = 'https://cloudscout-rest.herokuapp.com/v1/players' + query
        if (filterString != null) {
            URL = URL + '&' + filterString
        }
        const response = await fetch(URL);
        const json = await response.json();
        return json
        */
       return [];
    }

    render() {
        return (
            <div className='main-page dashboard'>
                <div className='page-header'>
                    <h1>Dashboard</h1>
                    <SearchBar handleSearch={ this.handleSearch }/>
                    <Filter handleFilterChange={ this.handleFilterChange }/>
                    {/*<p>Results returned: {this.state.json.length}</p>*/}
                </div>
                <PlayerTable players={ playerData.map(BasePlayer.fromJson).sort((a,b) => {return (a.timestamp < b.timestamp) ? 1 : -1}) }/>
            </div>
        );
    }
}

export default Dashboard;
