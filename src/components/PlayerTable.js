import React, { Component } from 'react';
import './PlayerTable.scss';

class PlayerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: props.players
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            players: props.players
        }
    }

    render() {
        return (
            <>
                <div className='table-header'>
                    <table cellPadding={0} cellSpacing={0} border={0}>
                        <thead>
                            <tr>
                                <th key={0}>Name</th>
                                <th key={1} className='institution'>Institution</th>
                                <th key={2}>Division</th>
                                <th key={3} className='date-entered'>Entered</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='table-content'>
                    <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                            { this.state.players.map((player, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ player.getFullName() }</td>
                                        <td className='institution'>{ player.institution }</td>
                                        <td>{ player.division }</td>
                                        <td className='date-entered'>{ player.getFormattedDate() }</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default PlayerTable;
