import React from 'react'
import styles from './header-search.module.css'

function Search(): JSX.Element {
    return (
        <div className={styles['search-container']}>
            <input
                type="text"
                placeholder="  Search"
                className="search"
            />
        </div>
    )
}

export default Search;