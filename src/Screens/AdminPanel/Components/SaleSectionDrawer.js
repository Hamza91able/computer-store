import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Axios from 'axios';

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import SaleSectionTable from './SaleSectionTable';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { prodId } = props;
    const [product, setProduct] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        getProduct();
    }, [])

    const getProduct = () => {
        Axios({
            url: `${connectionString}/products/get-specific-product/${prodId}`,
            method: 'GET'
        }).then(res => {
            setProduct(res.data.product);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error while fetching product',
            });
        })
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} style={{
                backgroundColor: '#f0c14b',
                color: '#111',
                fontWeight: 'normal',
                bomdhadow: 'none',
                border: '1px solid black',
                borderColor: "#a88734 #9c7e31 #846a29",
            }}>
                Put on Sale
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {product.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SaleSectionTable token={props.token} userId={props.userId} product={product} />
            </Dialog>
        </React.Fragment>
    );
}