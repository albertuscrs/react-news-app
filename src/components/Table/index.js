import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { Button, Sort } from '../Button/index';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
}

class Table extends Component{

  constructor(props){
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.onSort = this.onSort.bind(this);
  }

  // sort function
  onSort(sortKey){
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render(){
    const { list, removeItem } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return(
      <div>
        <div className="mt-3 mb-5 ">
          <Sort
            className="btn btn-xs btn-outline-dark sortBtn"
            sortKey={ 'NONE' }
            onSort= { this.onSort }
            activeSortKey={ sortKey }
          >Default</Sort>
          <Sort
            className="btn btn-xs btn-outline-dark sortBtn"
            sortKey={ 'TITLE' }
            onSort= { this.onSort }
            activeSortKey={ sortKey }
          >Title</Sort>
          <Sort
            className="btn btn-xs btn-outline-dark sortBtn"
            sortKey={ 'AUTHOR' }
            onSort= { this.onSort }
            activeSortKey={ sortKey }
          >Author</Sort>
          <Sort
            className="btn btn-xs btn-outline-dark sortBtn"
            sortKey={ 'COMMENTS' }
            onSort= { this.onSort }
            activeSortKey={ sortKey }
            >Comments</Sort>
          <Sort
            className="btn btn-xs btn-outline-dark sortBtn"
            sortKey={ 'POINTS' }
            onSort= { this.onSort }
            activeSortKey={ sortKey }
            >Points</Sort>
        </div>
        {
          // list.filter( isSearched(searchTerm) ).map(item =>
          reverseSortedList.map(item =>
            <div key={ item.objectID }>
                <h3>  <a href = { item.url } target='_blank' rel="noopener noreferrer">{ item.title }</a></h3>
                <h4> { item.author } | { item.num_comments } Comments | { item.points } Points 
                  <Button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={ () => removeItem(item.objectID) }
                  >
                    Remove me
                  </Button>
                </h4> <hr />
            </div>
          )
        }
      </div>
    )
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired
}

export default Table;