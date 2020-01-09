import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'

class ProductOverview extends Component {

    render() {
        const { overview } = this.props;

        return (
            <div>
                <ReactMarkdown
                    source={overview}
                    escapeHtml={false}
                />
            </div>
        );
    }
}

export default ProductOverview;