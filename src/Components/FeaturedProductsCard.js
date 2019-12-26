import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Divider, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        height: 557
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                title={
                    <Typography style={{
                        fontSize: 20, justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                        color: "blue",
                        cursor: 'pointer',
                    }}>Dell G5 15 5590</Typography>
                }
            />
            <CardMedia
                style={{ cursor: "pointer" }}
                className={classes.media}
                image="https://m.media-amazon.com/images/I/91JA5-hAnoL._AC_UY218_ML3_.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant='body2' color="textSecondary" component="p">
                    5590 | 15-inch gaming laptop with a 24mm desi...
                    <br />
                    * 9th Generation Intel® Core™ i7-9750H (12MB Cache, up to 4.5 GHz, 6 cores)
                    <br />
                    * 16GB DDR4 Memory | 128GB M.2 PCIe NVMe Solid State Drive + 1TB 5400 HDD
                    <br />
                    * NVIDIA® GeForce® RTX™ 2060 6GB GDDR6
                    <br />
                    * Windows® 10 | Backlit full-size, spill-resistant WASD keyboard
                    <br />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <Typography variant='caption' style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>
                            Rs. 205,000
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                        }}>
                            <Button variant="contained" style={{ width: 200, backgroundColor: 'rgb(255, 163, 58)', color: '#101820FF' }}>VIEW DETAILS</Button>
                        </div>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}