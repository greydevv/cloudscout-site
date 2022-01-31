import { SpinnerView } from 'components/Spinner';
import './PlayerTable.scss';
import { NavLink } from 'react-router-dom';
import { StarFilled } from 'components/Icons';
import { formatDate, getFullName, classNumToString } from 'util/text';
import { useRest, usePut } from 'api/useRest';

function TableHeader() {
    return (
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
    );
}

function TableBody({ players, favorites, isLoading, onFavorite, onUnfavorite }) {
    if (isLoading) {
        return <SpinnerView />
    }

    if (players.length === 0 && !isLoading) {
        return (
            <div className='table__content-nodata'>
                <p className='table__content-nodata__text'>No data to display.</p>
            </div>
        );
    }

    return (
        <table className='table__content' cellPadding={0} cellSpacing={0}>
            <tbody>
                {players.map((player, i) => {
                    const isFavorited = favorites.includes(player.pid);
                    return (
                        <TableRow 
                            key={ i } 
                            player={ player } 
                            isFavorited={ isFavorited } 
                            onFavorite={ onFavorite }
                            onUnfavorite={ onUnfavorite }
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

function TableRow({ player, isFavorited, onUnfavorite, onFavorite }) {
    return (
        <tr className={ isFavorited ? 'table__row-active' : 'table__row'}>
            <td className='table__favorite__col'>
                {isFavorited
                    ? (<button className='favorite__btn-active' onClick={ () => onUnfavorite(player.pid) }>
                           <StarFilled className='favorite__btn__icon-active' />
                       </button>)
                    : (<button className='favorite__btn' onClick={ () => onFavorite(player.pid) }>
                           <StarFilled className='favorite__btn__icon' />
                       </button>)
                }
            </td>
            <td className='p-body-sm'>
                <NavLink className='table__link' to={`/app/player/${player.pid}`}>
                    { getFullName(player.meta.first, player.meta.last) }
                </NavLink>
            </td>
            <td className='p-body-sm te-lg'>{ player.meta.institution }</td>
            <td className='p-body-sm te-sm'>{ player.meta.division }</td>
            <td className='p-body-sm te-sm'>{ player.meta.position || '-' }</td>
            <td className='p-body-sm te-sm'>{ classNumToString(player.meta.class) || '-' }</td>
            <td className='p-body-sm te-right te-grey'>{ formatDate(player.meta.date) }</td>
        </tr>
    );
}

export default function PlayerTable({ players, isLoading, favorites, onFavorite, onUnfavorite }) {
    return (
        <>
            <TableHeader />
            <div className={'table__content__container' + (isLoading || players.length === 0 ? '-nodata' : '')}>
                <TableBody 
                    isLoading={ isLoading }
                    players={ players } 
                    favorites={ favorites }
                    onFavorite={ onFavorite }
                    onUnfavorite={ onUnfavorite }
                />
            </div>
        </>
    );
}

