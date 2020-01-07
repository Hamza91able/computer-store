import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button } from '@material-ui/core';

// Components
import CategoriesTable from '../Components/Table';

class AddCategories extends Component {
    render() {
        return (
            <div>
                <Container maxWidth='lg'>
                    <Grid item>
                        <Grid xs={12}>
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Add Categories
                            </Typography>
                            <TextField id="filled-basic" label="Add Category" variant="filled" />
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f0c14b',
                                    color: '#111',
                                    fontWeight: 'normal',
                                    boxShadow: 'none',
                                    border: '1px solid black',
                                    borderColor: "#a88734 #9c7e31 #846a29",
                                    height: 55,
                                    marginLeft: 10
                                }}
                            >
                                Add Category
                            </Button>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid xs={12}>
                            Current Categories
                            <CategoriesTable heading="Categories" />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddCategories;