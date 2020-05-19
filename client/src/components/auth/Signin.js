import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Fingerprint, Email } from '@material-ui/icons';
import { login } from '../../actions/auth';
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

const Signin = ({ classes, isAuthenticated, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        login({ email, password });
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
                            <Email />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="email"
                                label="email"
                                type="email"
                                fullWidth
                                autoFocus
                                required
                                value={email}
                                name="email"
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="password"
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
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: 'none' }} variant="text" color="primary">
                                Forgot password ?
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button type="submit" variant="outlined" color="primary" style={{ textTransform: 'none' }}>
                            Login
                        </Button>
                    </Grid>
                </form>
            </div>
        </Paper>
    );
};

Signin.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(withStyles(styles)(Signin));
