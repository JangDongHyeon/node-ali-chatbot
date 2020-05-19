import React from 'react';
import Speech from 'speak-tts';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
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

const Chat = ({
    chat: { bot, text, date, _id },
    last,
    speech,
    ttsCheck,
    setTtsCheck,
    stopListening,
    startListening,
    setWindowCheck,
    setHttpCheck,
    micCheck,
}) => {
    const momentDate = () => {
        return <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>;
    };
    // if (last) {
    //     if (text.indexOf('https') != -1) {
    //         window.open(text);
    //     }
    // }
    if (last) {
        if (bot) {
            if (ttsCheck) {
                setTtsCheck(false);

                speech
                    .speak({
                        text: text,
                        queue: false,
                        listeners: {
                            onstart: () => {

                                stopListening();
                            },
                            onend: () => {
                                if (micCheck) startListening();
                            },
                            onresume: () => { },
                            onboundary: (event) => { },
                        },
                    })
                    .then((data) => { })
                    .catch((e) => {
                        console.error('An error occurred :', e);
                    });

            }
        }
    }



    const classes = useStyles();
    return (
        <>
            <ListItem key={_id}>
                <Grid container>
                    {bot ? (
                        <>
                            <Grid item xs={1}>
                                <ListItemIcon align={bot ? 'left' : 'right'}>
                                    <Avatar align={bot ? 'left' : 'right'} className={classes.orange} alt="Alice" src="/broken-image.jpg" />
                                </ListItemIcon>
                            </Grid>
                            <Grid item xs={10}>
                                <ListItemText align={bot ? 'left' : 'right'} primary={text}></ListItemText>
                                    }
                            </Grid>
                        </>
                    ) : (
                            <>
                                <Grid item xs={11}>
                                    <ListItemText align={bot ? 'left' : 'right'} primary={text}></ListItemText>
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemIcon align={bot ? 'left' : 'right'}>
                                        <Avatar
                                            style={{ marginLeft: 'auto', alignItems: 'center' }}
                                            className={classes.purple}
                                            src="/broken-image.jpg"
                                        />
                                    </ListItemIcon>
                                </Grid>
                            </>
                        )}

                    <Grid item xs={12}>
                        <ListItemText align={bot ? 'left' : 'right'} secondary={momentDate()}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </>
    );
};

export default Chat;
