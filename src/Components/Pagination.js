import React from 'react';
import { Pagination } from 'react-bootstrap';



function paginationBasic(props) {

    let active = props.page;
    let items = [];
    let maxNumbers = Math.ceil((props.totalItems / 10));
    let selectedNumber = props.page;

    for (let number = 1; number <= maxNumbers; number++) {
        items.push(
            <Pagination.Item onClick={() => { props.changePage(number); selectedNumber = number }} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination size="sm">
                <Pagination.First onClick={() => props.changePage(1)} />
                <Pagination.Prev onClick={() => {
                    if (selectedNumber > 1) {
                        props.changePage(selectedNumber - 1);
                        selectedNumber = selectedNumber - 1;
                    }
                }} />
                {items}
                <Pagination.Next onClick={() => {
                    if (selectedNumber < maxNumbers) {
                        props.changePage(selectedNumber + 1);
                        selectedNumber = selectedNumber + 1
                    }
                }} />
                <Pagination.Last onClick={() => props.changePage(maxNumbers)} />
            </Pagination>
        </div >
    )
};

export default paginationBasic;