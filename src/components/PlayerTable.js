import { SpinnerView } from 'components/Spinner';
import './PlayerTable.scss';
import { NavLink } from 'react-router-dom';
import { StarFilled } from 'components/Icons';

export default function PlayerTable({ players, isLoading, favorites, onFavorite, onUnfavorite }) {
    return (
        <>
            <div className='table__header__container'>
                <table cellPadding={0} cellSpacing={0} border={0}>
                    <thead className='table__header'>
                        <tr>
                            <th className='table__favorite__col'></th>
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
                                {players.map((player, i) => {
                                        const isFavorited = favorites.includes(player.pid);
                                        return (
                                            <tr key={ i } className={ isFavorited ? 'table__row-active' : 'table__row'}>
                                                <td className='table__favorite__col'>
                                                    {isFavorited
                                                        ? (
                                                            <button className='favorite__btn-active' onClick={ () => onUnfavorite(player.pid) }>
                                                                <StarFilled className='favorite__btn__icon-active' />
                                                            </button>
                                                        )
                                                        : (
                                                            <button className='favorite__btn' onClick={ () => onFavorite(player.pid) }>
                                                                <StarFilled className='favorite__btn__icon' />
                                                            </button>
                                                        )

                                                    }
                                                </td>
                                                <td className='p-body-sm'>
                                                    <NavLink className='table__link' to={`/app/player/${player.pid}`}>
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
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>
    );
}

