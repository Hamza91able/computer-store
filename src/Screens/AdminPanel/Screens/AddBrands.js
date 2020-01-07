import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

// Components
import BrandsTable from '../Components/Table';

class AddCategories extends Component {

    render() {

        return (
            <div>
                <Container maxWidth='lg'>
                    <Grid item>
                        <Grid xs={12}>
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Select Parent Category
                            </Typography>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    style={{ width: 200 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={10}>Processors</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{ marginTop: 20 }} />
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Add Brands
                            </Typography>
                            <TextField id="filled-basic" label="Add Brands" variant="filled" />
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
                                Add Brand
                            </Button>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid xs={12}>
                            Current Brands
                            <BrandsTable heading="Brands" />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddCategories;