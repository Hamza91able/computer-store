import React from 'react';
import { Pagination } from 'react-bootstrap';

let active = 1;
let items = [];
for (let number = 1; number <= 2; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}

function paginationBasic() {
    return (
        <div>
            <Pagination size="sm">
                <Pagination.First />
                <Pagination.Prev />
                {items}
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div >
    )
};

export default paginationBasic;