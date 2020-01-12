import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Screens
import AddCategories from '../Screens/AddCategories';
import AddBrands from '../Screens/AddBrands';
import AddSubCategories from '../Screens/AddSubCategories';
import ProductSubmit from '../Screens/ProductSubmit';
import AddFeaturedProduct from '../Screens/AddFeaturedProduct';
import StockManagement from '../Screens/StockManagement';
import ChangeBanners from '../Screens/ChangeBanners';
import Orders from '../Screens/Orders';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // height: '44vh',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(8);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                style={{ width: 300 }}
            >
                <Tab label="Add Products" {...a11yProps(0)} />
                <Tab label="Add Brands" {...a11yProps(1)} />
                <Tab label="Add Categories" {...a11yProps(2)} />
                <Tab label="Add Sub Categories" {...a11yProps(3)} />
                <Tab label="Add Featured Products" {...a11yProps(4)} />
                <Tab label="Sale Section" {...a11yProps(5)} />
                <Tab label="Stock Management" {...a11yProps(6)} />
                <Tab label="Products Management" {...a11yProps(7)} />
                <Tab label="Change Banners" {...a11yProps(8)} />
                <Tab label="Orders" {...a11yProps(9)} />
            </Tabs>
            <TabPanel style={{ width: '100%' }} value={value} index={0}>
                <ProductSubmit token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={1}>
                <AddBrands token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={2}>
                <AddCategories token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={3}>
                <AddSubCategories token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={4}>
                <AddFeaturedProduct token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={6}>
                <StockManagement token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={7}>
                Item Seven
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={8}>
                <ChangeBanners token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={9}>
                <Orders token={props.token} userId={props.userId} />
            </TabPanel>
        </div>
    );
}