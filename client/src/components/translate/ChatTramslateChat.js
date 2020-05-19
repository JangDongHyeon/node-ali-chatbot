import React, { useEffect, useState, useRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Speech from 'speak-tts';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import socketio from 'socket.io-client';
import MicIcon from '@material-ui/icons/Mic';
import Chat from './ChatTramslateChatItem';
import UserItem from './ChatTramslateChatUserItem';
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';
import {
    addClubUserItem,
    addClubChatItem,
    deleteClubUserItem,
    getClub,
    addClubChat,
    modeUpdate,
    modeChangeSocket,
} from '../../actions/translate';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import MicOffIcon from '@material-ui/icons/MicOff';
import Spinner from '../layout/spinner';
import _ from 'lodash';
import SpeechRecognition from 'react-speech-recognition';
import { withRouter } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { SOCKET } from '../../config';

let socket;
const initialState = {
    language: '',
    trans: '',
};

let userData;

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    chatSection: {
        width: '100%',
        height: '80vh',
    },
    headBG: {
        backgroundColor: '#e0e0e0',
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
    orange: {
        backgroundColor: deepOrange[500],
    },
    purple: {
        backgroundColor: deepPurple[500],
    },
    red: {
        backgroundColor: red[500],
    },
}));

const ChatTramslateChat = ({
    translate: { mode, club, loading, chats },
    auth: { user },
    match,
    addClubUserItem,
    addClubChatItem,
    deleteClubUserItem,
    getClub,
    addClubChat,
    modeUpdate,
    listening,
    finalTranscript,
    browserSupportsSpeechRecognition,
    stopListening,
    startListening,
    recognition,
    modeChangeSocket,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('');
    const [msg, setMsg] = useState('');

    const { handleSubmit, control, setValue, reset, getValues } = useForm();
    const { language, trans } = formData;

    const topOfList = useRef(null);

    //    const [windowCheck, setWindowCheck] = useState(null);
    if (!browserSupportsSpeechRecognition) {
        // window.alert('Chrome 사용해 주세요');
    } else {
        recognition.continous = true;

        recognition.interimResults = true;
        if (language === 'en') {

            recognition.lang = 'en-US';
        } else {

            recognition.lang = 'ko';
        }
    }

    const classes = useStyles();

    const scrollToBottom = () => {
        if (topOfList.current) {
            topOfList.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {

        // history.listen(() => {
        //     console.log('sdsd');
        //     socket.close();
        // });

        if (!club) getClub(match.params.id, trans);

        // setTtsCheck(false);
        scrollToBottom();
    }, [loading, getClub, match.params.id]);

    useEffect(() => {
        const modeData = { ...initialState };
        userData = new FormData();
        for (const key in mode) {
            if (key in modeData) modeData[key] = mode[key];
        }
        // if (mode === 'en') {
        //     if (botmode !== 'scenario' || botmode !== 'travel' || botmode !== 'intent') {
        //         modeData['botmode'] = 'scenario';
        //     }
        // } else if (mode === 'kr') {
        //     if (botmode !== 'scenario' || botmode !== 'gag' || botmode !== 'chest' || botmode !== 'silver') {
        //         modeData['botmode'] = 'scenario';
        //     }
        // }
        setFormData(modeData);
    }, [club]);


    // useEffect(() => {
    //     const modeData = { ...initialState };
    //     userData = new FormData();
    //     for (const key in club) {
    //         if (key in modeData) modeData[key] = club[key];
    //     }
    //     // if (mode === 'en') {
    //     //     if (trans !== 'scenario' || trans !== 'travel' || trans !== 'intent') {
    //     //         modeData['trans'] = 'scenario';
    //     //     }
    //     // } else if (mode === 'kr') {
    //     //     if (trans !== 'scenario' || trans !== 'gag' || trans !== 'chest' || trans !== 'silver') {
    //     //         modeData['trans'] = 'scenario';
    //     //     }
    //     // }
    //     setFormData(modeData);
    // }, [club]);

    useEffect(() => {
        try {
            socket = socketio(`${SOCKET}/groupChat`);

            socket.on('connect', () => {
                console.log('Yea! User  connected');

                let params = {
                    room: match.params.id,
                    user: user._id,
                };

                socket.emit('join', params, () => {
                    console.log('User has joined thos channel');
                });
            });
            socket.on('modeChange', (data) => {
                modeChangeSocket(data);
            });
            socket.on('usersList', (data) => {
                addClubUserItem(data);
            });
            socket.on('userDelete', (data) => {
                deleteClubUserItem(match.params.id, data);
            });
            socket.on('newMessage', (data) => {
                console.log(trans);
                addClubChatItem(data, match.params.id, trans, language);
            });
        } catch (error) {
            console.log(error);
        }
        return () => {
            socket.emit('userDeleteCall', user._id);

            socket.close();
            stopListening();
        };
    }, []);


    useEffect(() => {
        //setTtsCheck(true);

        scrollToBottom();
        setMessage('');
    }, [chats]);

    // const _init = () => {
    //     speech
    //         .init({
    //             volume: 1,
    //             lang: 'ko-KR',
    //             rate: 1,
    //             pitch: 1,
    //             //'voice':'Google UK English Male',
    //             //'splitSentences': false,
    //             listeners: {
    //                 onvoiceschanged: (voices) => {
    //                     console.log('Voices changed', voices);
    //                 },
    //             },
    //         })
    //         .then((data) => {})
    //         .catch((e) => {
    //             console.error('An error occured while initializing : ', e);
    //         });
    // };

    // const onChangeMessage = (e) => {
    //     setMessage(e.target.value);

    //     // setTtsCheck(false);
    // };

    // const onClickMessage = () => {
    //     if (message !== '') {
    //         stopListening();
    //         addClubChat(socket, message, match.params.id);
    //         // setTtsCheck(false);
    //         setMessage(' ');

    //         scrollToBottom();
    //     }
    //     return;
    // };
    // const onTextChange = (e) => {
    //     if (e.key === 'Enter' && e.shiftKey) {
    //         setMessage(message + '\n');
    //     } else if (e.key === 'Enter') {
    //         onClickMessage();
    //     }
    // };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeFormData = (e) => {
        console.log(e.target.name);
        if (user._id === club.classmonitor._id) {

            if (e.target.value === 'en') {
                recognition.lang = 'en-US';
            } else {
                recognition.lang = 'ko';
            }
        }
        userData.set([e.target.name], e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        modeUpdate(userData, match.params.id);



    };

    const handleTalkClick = () => {
        // setTtsCheck(false);
        if (!browserSupportsSpeechRecognition) {
            return null;
        }
        if (listening) {
            stopListening();
            //setMicCheck(false);
            //state_stt = 'stop';
        } else {
            startListening();
            //setMicCheck(true);
            // this.state_stt = 'ready';
        }
    };

    if (browserSupportsSpeechRecognition) {
        recognition.onresult = (event) => {
            let interimTranscript = '';
            // setTtsCheck(false);
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }

            setValue('message', interimTranscript);

            if (finalTranscript === '') {
                setValue('message', interimTranscript);
            } else {
                setValue('message', finalTranscript);
                if (listening) onSubmit(getValues());
            }

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ');
            const stopCmd = transcriptArr.slice(-3, -1);

            if (stopCmd[0] === '마이크' && stopCmd[1] === '중단') {
                recognition.stop();
                recognition.onend = () => {
                    console.log('Stopped listening per command');
                    const finalText = transcriptArr.slice(0, -3).join(' ');
                    console.log('real:', finalText);
                };
            }
        };
    }
    const onSubmit = (data, e) => {
        console.log(data.message);
        if (data.message !== '') {
            addClubChat(socket, data.message, match.params.id, trans, language);
            reset({ message: '' });
        }
    };

    return loading || club === null ? (
        <Spinner />
    ) : (
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 20,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">경고창</h2>
                            <p id="transition-modal-description">{msg}</p>
                        </div>
                    </Fade>
                </Modal>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={{ marginTop: '1%' }} variant="h4" align="center" color="textPrimary" className="header-message">
                            Translate
                    </Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={2} className={classes.borderRight500}>
                        <List>
                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                    <Avatar className={classes.purple} src="/broken-image.jpg" />
                                </ListItemIcon>
                                <ListItemText primary={user.name}></ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid item xs={12} style={{ padding: '10px' }}>
                            {/* <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth /> */}
                            {/* <FormControl component="fieldset">
                                <FormLabel component="legend">Mode</FormLabel>
                                <RadioGroup aria-label="mode" name="mode" value={mode} onChange={(e) => onChangeFormData(e)}>
                                    <FormControlLabel value="max" control={<Radio />} label="max" />
                                    <FormControlLabel value="semi" control={<Radio />} label="semi" />
                                    <FormControlLabel value="lock" control={<Radio />} label="lock" />
                                </RadioGroup>
                            </FormControl> */}
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Language</FormLabel>
                                <RadioGroup aria-label="language" name="language" value={language} onChange={(e) => onChangeFormData(e)}>
                                    <FormControlLabel value="en" control={<Radio />} label="english" />
                                    <FormControlLabel value="ko" control={<Radio />} label="korea" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Translate</FormLabel>
                                <RadioGroup aria-label="trans" name="trans" value={trans} onChange={(e) => onChangeFormData(e)}>
                                    <>
                                        <FormControlLabel value="en" control={<Radio />} label="En" />
                                        <FormControlLabel value="ko" control={<Radio />} label="Ko" />
                                        <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                                    </>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Divider />
                        <List>

                            {club.users.length > 0 && club.users.map((user) => <UserItem key={user._id} user={user}></UserItem>)}
                        </List>
                    </Grid>
                    <Grid item xs={10}>
                        <List className={classes.messageArea}>
                            {/* {personal.length > 0 && personal.map((chat) => <Chat key={chat._id} chat={chat}></Chat>)} */}
                            {chats.length > 0 &&
                                chats.map((chat, i, arr) =>
                                    i === arr.length - 1 ? (
                                        <Chat key={chat._id} chat={chat} auth={user} trans={trans}></Chat>
                                    ) : (
                                            <Chat key={chat._id} last={false} chat={chat} auth={user} trans={trans}></Chat>
                                        )
                                )}

                            <div ref={topOfList} />
                        </List>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container style={{ padding: '20px' }}>
                                <Grid item xs={10}>
                                    <Controller as={<TextField fullWidth />} name="message" control={control} />
                                </Grid>

                                <Grid item xs={1} align="right">
                                    <Fab color="primary" aria-label="add" type="submit">
                                        <SendIcon />
                                    </Fab>
                                </Grid>

                                <Grid item xs={1} align="right">
                                    <IconButton aria-label="delete" onClick={() => handleTalkClick()}>
                                        {listening ? <MicOffIcon /> : <MicIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                {/* {_init()} */}
            </>
        );
};
ChatTramslateChat.propTypes = {
    getClub: PropTypes.func.isRequired,
    addClubChat: PropTypes.func.isRequired,
    addClubChatItem: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    translate: state.translate,
    auth: state.auth,
});

const options = {
    autoStart: false,
};

// const alicePropsAreEqual = (aliceMovie, nextMovie) => {
//     console.log(aliceMovie);
//     console.log(nextMovie);

//     return aliceMovie.club === nextMovie.club;
// };

export default connect(mapStateToProps, {
    addClubUserItem,
    addClubChatItem,
    deleteClubUserItem,
    getClub,
    addClubChat,
    modeUpdate,
    modeChangeSocket,
})(SpeechRecognition(options)(withRouter(ChatTramslateChat)));
