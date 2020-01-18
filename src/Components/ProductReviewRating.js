import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (props.rating) {
            setValue(props.rating);
        }
    })

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        props.changeRating(newValue);
                    }}
                />
            </Box>
        </div>
    );
}