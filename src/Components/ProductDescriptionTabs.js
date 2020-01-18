import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Static
import '../Static/CSS/ProductDescriptionTabs.css';

// Components
import ProductOverview from './ProductOverview';
import ProductSpecifications from './ProductSpecifications';
import ProductReviews from './ProductReviews';
import ProductReviewModal from './ProductReviewModal';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default class FullWidthTabs extends React.Component {

    state = {
        value: 0,
        product: null
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    };

    componentDidMount() {
        if (this.props.currentProduct) {
            this.setState({
                product: this.props.currentProduct
            })
        }
    }

    render() {
        const { value } = this.state;

        return (
            <React.Fragment>
                <div>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            aria-label="simple tabs example"
                            variant="fullWidth"
                        >
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Specifications" {...a11yProps(1)} />
                            <Tab label="Reviews" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <ProductOverview overview={this.props.overview} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProductSpecifications specifications={this.props.specifications} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{ float: 'right' }}>
                            <ProductReviewModal userId={this.props.userId} token={this.props.token} currentProduct={this.props.product} />
                        </div>
                        <ProductReviews currentProduct={this.props.product} />
                    </TabPanel>
                </div>
            </React.Fragment>
        );
    }

}