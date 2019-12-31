import React, { Component } from 'react';


// Static
import '../Static/CSS/ProductSpecificationsTable.css';
import { Typography } from '@material-ui/core';

class ProductSpecifications extends Component {

    render() {

        return (
            <div>
                <Typography color='textSecondary' variant='h6'>
                    Learn more about Core i9-9900K
                </Typography>
                <Typography style={{ marginTop: 10 }} color='textSecondary' variant='h6'>
                    Model
                </Typography>
                <table style={{ width: "100%" }}>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Brand</th>
                        <td>Intel</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Processors Type</th>
                        <td>Desktop</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Series</th>
                        <td>Core i9 9th Gen</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Name</th>
                        <td>Core i9-9900K</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Model</th>
                        <td>BX80684I99900K</td>
                    </tr>
                </table>
                <br />
                <Typography color='textSecondary' variant='h6'>
                    For more technical details visit <a href='https://ark.intel.com/content/www/us/en/ark/products/186605/intel-core-i9-9900k-processor-16m-cache-up-to-5-00-ghz.html' target="_blank">here</a>
                </Typography>
            </div>
        );
    }
}

export default ProductSpecifications;