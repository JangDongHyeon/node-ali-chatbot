import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint, Email } from '@material-ui/icons';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const styles = (theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit,
    },
});

const Signup = ({ classes, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        register({ name, email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Paper className={classes.padding} style={{ height: '80vh' }}>
            <div className={classes.margin}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="username"
                                label="Username"
                                value={name}
                                name="name"
                                onChange={(e) => onChange(e)}
                                type="text"
                                fullWidth
                                autoFocus
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Email />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="email"
                                label="email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => onChange(e)}
                                fullWidth
                                autoFocus
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="username"
                                label="Password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                type="password"
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" style={{ marginTop: '3%' }} justify="space-between">
                        <Grid item>
                            Already have an account?
                            <Link to="/signin">Sign In</Link>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button type="submit" variant="outlined" color="primary" style={{ textTransform: 'none' }}>
                            Signup
                        </Button>
                    </Grid>
                </form>
            </div>
        </Paper>
    );
};

Signup.prototypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(withStyles(styles)(Signup));
