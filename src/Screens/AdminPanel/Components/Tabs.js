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
import ProductsManagement from '../Screens/ProductsManaement';
import SaleSection from '../Screens/SaleSection';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            props.history.replace('/admin/add-product')
        } else if (newValue === 1) {
            props.history.replace('/admin/add-brands')
        } else if (newValue === 2) {
            props.history.replace('/admin/add-categories')
        } else if (newValue === 3) {
            props.history.replace('/admin/add-sub-categories')
        } else if (newValue === 4) {
            props.history.replace('/admin/add-featured-products')
        } else if (newValue === 5) {
            props.history.replace('/admin/sale-section')
        } else if (newValue === 6) {
            props.history.replace('/admin/stock-management')
        } else if (newValue === 7) {
            props.history.replace('/admin/products-management')
        } else if (newValue === 8) {
            props.history.replace('/admin/change-banners')
        } else if (newValue === 9) {
            props.history.replace('/admin/orders')
        }
    };

    React.useEffect(() => {
        console.log(props.match.params.tab)
        if (props.match.params.tab === 'add-product') {
            setValue(0)
        } else if (props.match.params.tab === 'add-brands') {
            setValue(1)
        } else if (props.match.params.tab === 'add-categories') {
            setValue(2)
        } else if (props.match.params.tab === 'add-sub-categories') {
            setValue(3)
        } else if (props.match.params.tab === 'add-featured-products') {
            setValue(4)
        } else if (props.match.params.tab === 'sale-section') {
            setValue(5)
        } else if (props.match.params.tab === 'stock-management') {
            setValue(6)
        } else if (props.match.params.tab === 'products-management') {
            setValue(7)
        } else if (props.match.params.tab === 'change-banners') {
            setValue(8)
        } else if (props.match.params.tab === 'orders') {
            setValue(9)
        }
    })

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
                <SaleSection token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={6}>
                <StockManagement token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel style={{ width: '100%' }} value={value} index={7}>
                <ProductsManagement token={props.token} userId={props.userId} />
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