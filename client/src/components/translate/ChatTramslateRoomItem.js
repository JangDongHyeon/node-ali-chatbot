import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DefaultProfile from '../images/users.png';
import { connect } from 'react-redux';
import { API } from '../../config';
import CardActionArea from '@material-ui/core/CardActionArea';
import { addClub, deleteClub } from '../../actions/translate';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        width: '100%',
    },
});

const ChatTramslateRoomItem = ({ club: { _id, title, body, date, classmonitor }, user, history, addClub, socket, deleteClub }) => {
    const classes = useStyles();

    const roomJoinClick = async (id) => {
        addClub(socket, id, history);
    };

    const updateClick = async (id) => {

    }

    const deleteClick = async (id) => {
        deleteClub(id);
    }




    return (
        <Grid item xs={12} sm={6} md={4} style={{ marginTop: '3%' }}>
            <Card className={classes.root}>
                <CardActionArea onClick={() => roomJoinClick(_id)}>
                    <CardMedia
                        className={classes.media}
                        src={`${API}/trans/photo/${_id}`}
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                        component="img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {body}
                        </Typography>
                        <Typography variant="caption" style={{ marginTop: '2%' }} className="font-italic mark">
                            Class monitor <Link to={`profile/${classmonitor._id}`}> {classmonitor.name} </Link>
                            &nbsp;on <Moment format="YYYY/MM/DD">{date}</Moment>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => roomJoinClick(_id)}>
                        Join
                    </Button>
                    {classmonitor._id === user._id && (
                        <>
                            <Button size="small" color="primary" onClick={() => updateClick(_id)}>
                                Update
                            </Button>
                            <Button size="small" color="primary" onClick={() => deleteClick(_id)}>
                                Delete
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};
export default connect(null, { addClub, deleteClub })(withRouter(ChatTramslateRoomItem));
