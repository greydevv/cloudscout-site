import { useState } from 'react';
import { SpinnerView } from 'components/Spinner';
import './PlayerTable.scss';

function PlayerTable({ players, isLoading }) {

    return (
        <>
            <div className='table__header__container'>
                <table cellPadding={0} cellSpacing={0} border={0}>
                    <thead className='table__header'>
                        <tr>
                            <th className='p-body-sm' key={0}>Name</th>
                            <th className='p-body-sm te-lg' key={1}>Institution</th>
                            <th className='p-body-sm' key={2}>Division</th>
                            <th className='p-body-sm te-right' key={3}>Entered</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className='table__content__container'>
                { isLoading 
                    ? (
                        <SpinnerView />
                    )
                    : (
                        <table className='table__content' cellPadding={0} cellSpacing={0}>
                            <tbody>
                                { players.map((player, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td className='p-body-sm'>{ player.getFullName() }</td>
                                            <td className='p-body-sm te-lg'>{ player.institution }</td>
                                            <td className='p-body-sm'>{ player.division }</td>
                                            <td className='p-body-sm te-right te-grey'>{ player.getFormattedDate() }</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>
    );
}

export default PlayerTable;
