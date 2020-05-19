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
import Sentiment00 from '../images/sentimet00.jpg';
import Sentiment01 from '../images/sentimet01.jpg';
import Sentiment02 from '../images/sentimet02.jpg';
import Sentiment03 from '../images/sentimet03.jpg';
import Sentiment04 from '../images/sentimet04.jpg';
import Sentiment05 from '../images/sentimet05.jpg';
import Sentiment06 from '../images/sentimet06.jpg';

import { deepOrange, deepPurple, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
}));

const ChatAliceChatItem = ({
    chat: { bot, text, date, _id, user, sentiment },

    auth,
}) => {
    const sentimentCheck = () => {

        if (sentiment === '0') {
            return Sentiment00;
        } else if (sentiment === '1') {
            return Sentiment01;
        } else if (sentiment === '2') {
            return Sentiment02;
        } else if (sentiment === '3') {
            return Sentiment03;
        } else if (sentiment === '4') {
            return Sentiment04;
        } else if (sentiment === '5') {
            return Sentiment05;
        } else if (sentiment === '6') {
            return Sentiment06;
        }
    };

    const momentDate = () => {
        return <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>;
    };
    // if (last) {
    //     if (text.indexOf('https') != -1) {
    //         window.open(text);
    //     }
    // }
    // if (last) {
    //     if (bot) {
    //         if (ttsCheck) {
    //             setTtsCheck(false);
    //             if (text.indexOf('https') != -1) {
    //                 setWindowCheck(window.open(text));
    //             } else {
    //                 speech
    //                     .speak({
    //                         text: text,
    //                         queue: false,
    //                         listeners: {
    //                             onstart: () => {
    //                                 stopListening();
    //                             },
    //                             onend: () => {
    //                                 if (micCheck) startListening();
    //                             },
    //                             onresume: () => {},
    //                             onboundary: (event) => {},
    //                         },
    //                     })
    //                     .then((data) => {})
    //                     .catch((e) => {
    //                         console.error('An error occurred :', e);
    //                     });
    //             }
    //         }
    //     }
    // }

    const classes = useStyles();
    return (
        <>
            <ListItem key={_id}>
                <Grid container>
                    {bot || auth._id !== user._id ? (
                        <>
                            <Grid item xs={1} sm={1}>
                                <ListItemIcon align={'left'}>
                                    {!bot && (
                                        <Avatar
                                            align={'left'}
                                            style={{ marginLeft: 'auto', alignItems: 'center' }}
                                            src={sentimentCheck()}
                                        />
                                    )}
                                </ListItemIcon>
                            </Grid>
                            <Grid item xs={1} sm={1}>
                                <ListItemIcon align={'left'}>
                                    {bot ? (
                                        <Avatar
                                            align={'left'}
                                            style={{ marginLeft: 'auto', alignItems: 'center' }}
                                            className={classes.red}
                                            alt="Alice"
                                            src="/broken-image.jpg"
                                        />
                                    ) : (
                                            <Avatar
                                                style={{ marginLeft: 'auto', alignItems: 'center' }}
                                                className={classes.orange}
                                                src="/broken-image.jpg"
                                            />
                                        )}
                                </ListItemIcon>
                            </Grid>
                            <Grid item xs={10} sm={10}>
                                {text.indexOf('https') != -1 ? (
                                    <Link href={text} target="_blank">
                                        클릭해주세요
                                    </Link>
                                ) : (
                                        <ListItemText align={'left'} primary={text}></ListItemText>
                                    )}
                            </Grid>
                        </>
                    ) : (
                            <>
                                <Grid item xs={10} sm={10}>
                                    <ListItemText align={'right'} primary={text}></ListItemText>
                                </Grid>
                                <Grid item xs={1} sm={1}>
                                    <ListItemIcon align={'right'}>
                                        <Avatar
                                            style={{ marginLeft: 'auto', alignItems: 'center' }}
                                            className={classes.purple}
                                            src="/broken-image.jpg"
                                        />
                                    </ListItemIcon>
                                </Grid>
                                <Grid item xs={1} sm={1}>
                                    <ListItemIcon align={'right'}>
                                        {!bot && (
                                            <Avatar
                                                align={'right'}
                                                style={{ marginLeft: 'auto', alignItems: 'center' }}
                                                src={sentimentCheck()}
                                            />
                                        )}
                                    </ListItemIcon>
                                </Grid>
                            </>
                        )}

                    <Grid item xs={12}>
                        <ListItemText align={bot || auth._id !== user._id ? 'left' : 'right'} secondary={momentDate()}></ListItemText>
                        {bot ? (
                            <ListItemText align={bot || auth._id !== user._id ? 'left' : 'right'} secondary={'name: Alice'}></ListItemText>
                        ) : (
                                <ListItemText
                                    align={bot || auth._id !== user._id ? 'left' : 'right'}
                                    secondary={'name: ' + user.name}
                                ></ListItemText>
                            )}
                    </Grid>
                </Grid>
            </ListItem>
        </>
    );
};

export default ChatAliceChatItem;
