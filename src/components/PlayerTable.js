import { useState } from 'react';
import { SpinnerView } from 'components/Spinner';
import './PlayerTable.scss';
import { NavLink } from 'react-router-dom';

export default function PlayerTable({ players, isLoading }) {
    return (
        <>
            <div className='table__header__container'>
                <table cellPadding={0} cellSpacing={0} border={0}>
                    <thead className='table__header'>
                        <tr>
                            <th className='p-body-sm'>Name</th>
                            <th className='p-body-sm te-lg'>Institution</th>
                            <th className='p-body-sm te-sm'>Division</th>
                            <th className='p-body-sm te-sm'>Position</th>
                            <th className='p-body-sm te-sm'>Class</th>
                            <th className='p-body-sm te-right'>Entered</th>
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
                                            <td className='p-body-sm'>
                                                <NavLink to={`player/${player.pid}`}>
                                                    { player.getFullName() }
                                                </NavLink>
                                            </td>
                                            <td className='p-body-sm te-lg'>{ player.institution }</td>
                                            <td className='p-body-sm te-sm'>{ player.division }</td>
                                            <td className='p-body-sm te-sm'>{ player.position }</td>
                                            <td className='p-body-sm te-sm'>{ player.schoolClass }</td>
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
