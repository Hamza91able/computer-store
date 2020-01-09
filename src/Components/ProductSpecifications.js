import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'

class ProductSpecifications extends Component {

    render() {
        const { specifications } = this.props;

        return (
            <div>
                <ReactMarkdown
                    source={specifications}
                    escapeHtml={false}
                />
            </div>
        );
    }
}

export default ProductSpecifications;