import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create } from '../../actions/club';
import { setAlert } from '../../actions/alert';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Fingerprint, Email, Title, Notes, Collections } from '@material-ui/icons';

import { Link, withRouter } from 'react-router-dom';

const styles = (theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit,
    },
});
const initialState = {
    title: '',
    body: '',
    fileSize: '',
};

let userData;

const CreateAliceRoom = ({ classes, setAlert, create, history }) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        userData = new FormData();
    }, []);
    const { title, body, fileSize } = formData;

    const onChange = (e) => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;

        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        userData.set([e.target.name], value);
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
        if (fileSize !== 0)
            setFormData({
                ...formData,
                [e.target.name]: fileSize,
            });
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setAlert('File size should be less than 100kb', 'danger');
            return false;
        }

        if (title.length === 0 || body.length === 0) {
            setAlert('All fields are required', 'danger');
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            create(userData, history);
        }
    };

    return (
        <Paper className={classes.padding} style={{ height: '80vh' }}>
            <div className={classes.margin}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Collections />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="photo" label="photo" type="file" fullWidth name="photo" onChange={(e) => onChange(e)} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Title />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="title"
                                label="title"
                                type="text"
                                fullWidth
                                autoFocus
                                required
                                value={title}
                                name="title"
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Notes />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="body"
                                label="body"
                                name="body"
                                value={body}
                                onChange={(e) => onChange(e)}
                                type="text"
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button type="submit" variant="outlined" color="primary" style={{ textTransform: 'none' }}>
                            Create
                        </Button>
                    </Grid>
                </form>
            </div>
        </Paper>
    );
};

CreateAliceRoom.propTypes = {
    create: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, {
    setAlert,
    create,
})(withStyles(styles)(CreateAliceRoom));
