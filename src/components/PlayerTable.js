import { useState } from 'react';
import { SpinnerView } from 'components/Spinner';
import { Button } from 'components/Button';
import './PlayerTable.scss';
import { NavLink } from 'react-router-dom';
import { StarFilled, ChevronRight, ChevronLeft } from 'components/Icons';
import { isInteger, formatDate, getFullName, classNumToString } from 'util/text';
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

function PaginationButton({ children, isDisabled, icon, ...rest }) {
    return (
        <button 
            className={ 'pagination__btn' + (isDisabled ? '-disabled' : '')} 
            { ...rest }
        >
            { children }
        </button>
    );
}

function Pagination({ numPages, currentPage, onChange }) {
    return (
        <div className='pagination__container'>
            <div className='mx-auto pagination__inner'>
                <PaginationButton
                    isDisabled={ currentPage === 1 }
                    onClick={ () => onChange(currentPage - 1) }
                >
                    <ChevronLeft className='pagination__btn-icon'/>
                </PaginationButton>
                <p className='pagination__page'>{ currentPage }</p>
                <PaginationButton
                    isDisabled={ currentPage ===  numPages }
                    onClick={ () => onChange(currentPage + 1) }
                >
                    <ChevronRight className='pagination__btn-icon' />
                </PaginationButton>
            </div>
        </div>
    );
}

export default function PlayerTable({ players, isLoading, favorites, onFavorite, onUnfavorite, total, perPage, onChangePage, currentPage }) {
    const hasNextPage = currentPage*perPage < total;
    const hasPrevPage = currentPage > 1;
    let numPages = Math.floor(total / perPage);
    if (total % perPage > 0) {
        numPages++;
    }
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
                {!isLoading && numPages > 1 &&
                    <Pagination numPages={ numPages } currentPage={ currentPage } onChange={ onChangePage } />
                }
            </div>
        </>
    );
}

