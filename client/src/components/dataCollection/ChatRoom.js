import React, { useEffect, useState, useRef } from 'react';
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
import MicIcon from '@material-ui/icons/Mic';
import Chat from './Chat';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { dataColGet, dataColChat } from '../../actions/dataCol';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MicOffIcon from '@material-ui/icons/MicOff';
import Spinner from '../layout/spinner';
import SpeechRecognition from 'react-speech-recognition';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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
});

const ChatRoom = ({
    col: { dataCol, loading },
    auth: { user },
    match,
    dataColGet, dataColChat, dataColGetClear,
    listening,
    finalTranscript,
    browserSupportsSpeechRecognition,
    stopListening,
    startListening,
    recognition,

    history
}) => {
    const speech = new Speech();
    const [message, setMessage] = useState('');
    const [ttsCheck, setTtsCheck] = useState(false);
    const [micCheck, setMicCheck] = useState(false);

    const topOfList = useRef(null);

    recognition.continous = true;
    recognition.interimResults = true;

    recognition.lang = 'ko-kr';

    const classes = useStyles();
    const scrollToBottom = () => {
        if (topOfList.current) {
            topOfList.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {

        dataColGet(match.params.id);
        scrollToBottom();
    }, [dataColGet]);

    useEffect(() => {
        history.listen(() => {
            stopListening();

        });
        setTtsCheck(true);

        scrollToBottom();
    }, [dataCol]);

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

    const onChange = (e) => {
        setMessage(e.target.value);
        // setTtsCheck(false);
    };

    const onClickMessage = () => {
        if (message !== '') {
            stopListening();
            dataColChat(message, match.params.id);
            // setTtsCheck(false);
            setMessage(' ');

            scrollToBottom();
            // if (httpCheck) {
            //     console.log("s12345")
            //     startListening();
            //     setHttpCheck(false);
            // }
        }
        return;
    };
    const onTextChange = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            setMessage(message + '\n');
        } else if (e.key === 'Enter') {
            onClickMessage();
        }
    };

    const handleTalkClick = () => {
        // setTtsCheck(false);
        if (!browserSupportsSpeechRecognition) {
            return null;
        }
        if (listening) {
            stopListening();
            setMicCheck(false);
            //state_stt = 'stop';
        } else {
            startListening();
            setMicCheck(true);
            // this.state_stt = 'ready';
        }
    };



    recognition.onresult = (event) => {
        let interimTranscript = '';
        // setTtsCheck(false);
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript + ' ';
            else interimTranscript += transcript;
        }

        setMessage(interimTranscript);

        if (finalTranscript === '') {
            setMessage(interimTranscript);
        } else {
            setMessage(finalTranscript);
            if (listening) onClickMessage();
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

    return loading || dataCol === null ? (
        <Spinner />
    ) : (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" className="header-message">
                            Chat
                    </Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}>
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
                            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        </Grid>
                        <Divider />
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar className={classes.orange} alt="Alice" src="/broken-image.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Alice">Alice</ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <List className={classes.messageArea}>
                            {/* {personal.length > 0 && personal.map((chat) => <Chat key={chat._id} chat={chat}></Chat>)} */}
                            {dataCol.length > 0 &&
                                dataCol.map((chat, i, arr) =>
                                    i === arr.length - 1 ? (
                                        <Chat
                                            key={chat._id}
                                            last={true}
                                            speech={speech}
                                            ttsCheck={ttsCheck}
                                            setTtsCheck={setTtsCheck}
                                            stopListening={stopListening}
                                            startListening={startListening}
                                            micCheck={micCheck}
                                            chat={chat}
                                        ></Chat>
                                    ) : (
                                            <Chat key={chat._id} last={false} chat={chat}></Chat>
                                        )
                                )}

                            <div ref={topOfList} />
                        </List>
                        <Divider />
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-basic-email"
                                    label="Type Something"
                                    fullWidth
                                    value={message}
                                    onChange={(e) => onChange(e)}
                                    onKeyUp={(e) => onTextChange(e)}
                                />
                            </Grid>

                            <Grid xs={1} align="right">
                                <Fab color="primary" aria-label="add" onClick={() => onClickMessage()}>
                                    <SendIcon />
                                </Fab>
                            </Grid>
                            <Grid xs={1} align="right">
                                <IconButton aria-label="delete" onClick={() => handleTalkClick()}>
                                    {listening ? <MicOffIcon /> : <MicIcon />}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* {_init()} */}
            </>
        );
};

const mapStateToProps = (state) => ({
    col: state.dataCol,
    auth: state.auth,
});

const options = {
    autoStart: false,
};

export default connect(mapStateToProps, { dataColGet, dataColChat })(SpeechRecognition(options)(withRouter(ChatRoom)));
