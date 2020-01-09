import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function NestedList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem style={{ backgroundColor: 'rgb(255, 163, 58)', border: '1px solid black' }} button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{ fontWeight: 'bold' }}>Processors</Typography>} />
                {open ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List style={{ border: '1px solid black', borderTop: 'none' }} component="div" disablePadding>
                    {props.subCategories && props.subCategories.map((subCategory, index) => {
                        return (
                            <React.Fragment>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={<Typography style={{ fontSize: 14 }}>{subCategory}</Typography>} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )
                    })}
                </List>
            </Collapse>
        </List>
    );
}