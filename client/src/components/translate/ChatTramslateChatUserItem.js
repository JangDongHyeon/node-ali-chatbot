import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const ChatAliceChatUserItem = ({ user }) => {
    const classes = useStyles();
    return (
        <ListItem>
            <ListItemIcon>
                <Avatar className={classes.orange} src="/broken-image.jpg" />
            </ListItemIcon>
            <ListItemText primary={user.name}></ListItemText>
        </ListItem>
    );
};

export default ChatAliceChatUserItem;
