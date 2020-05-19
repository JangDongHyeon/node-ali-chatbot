import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import ChatRoomItem from './ChatTramslateRoomItem';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import socketio from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getClubs } from '../../actions/translate';
import { Link, withRouter } from 'react-router-dom';
import { SOCKET } from '../../config';

let socket;
const ChatTramslateRoom = ({ getClubs, translate: { clubs, loading }, auth: { user }, history }) => {
    useEffect(() => {
        getClubs();
    }, [getClubs]);

    useEffect(() => {
        try {
            socket = socketio(`${SOCKET}/groupRoom`, { forceNew: true });

            socket.on('connect', () => {
                console.log('Yea! room  connected');

                socket.emit('groupRoom', () => {
                    console.log('room has joined thos channel');
                });
            });
        } catch (error) {
            console.log(error);
        }
        return () => {
            socket.close();
        };
    }, []);

    return loading ? (
        <Spinner />
    ) : (
            <>
                {' '}
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={{ marginTop: '3%' }} variant="h3" align="center" color="textPrimary" className="header-message">
                            Alice Rooms
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{ float: 'right' }}>
                            <Link to="/trans/new" style={{ color: 'white', textDecoration: 'none' }}>
                                create Rooms
                        </Link>
                        </Button>
                    </Grid>

                    {clubs.length > 0 && clubs.map((club) => <ChatRoomItem key={club._id} club={club} user={user} socket={socket} />)}
                </Grid>
            </>
        );
};

ChatTramslateRoom.propTypes = { getClubs: PropTypes.func.isRequired, translate: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({
    translate: state.translate,
    auth: state.auth,
});

export default connect(mapStateToProps, { getClubs })(withRouter(ChatTramslateRoom));
