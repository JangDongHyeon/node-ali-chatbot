import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withRouter, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { personalRoomAdd, personalClear } from '../../actions/personal';
import { dataColRoomAdd } from '../../actions/dataCol';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
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
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {
        title: 'Data Collection',
        subTitle: 'Collection',
        description: ['Data Collection1'],
        buttonText: 'Data Collection Start',
        buttonVariant: 'contained',
    },
    {
        title: 'Personal ChatBot',
        subTitle: 'Personal',
        description: [

        ],
        buttonText: 'Personal ChatBot Start',
        buttonVariant: 'contained',
    },
    {
        title: 'Alice',
        subTitle: 'Alice',
        description: ['Alice1'],
        buttonText: 'Alice Start',
        buttonVariant: 'contained',
    },
    {
        title: 'Translate',
        subTitle: 'Translate',
        description: ['Translate'],
        buttonText: 'Translate Start',
        buttonVariant: 'contained',
    },


];

const Personal = ({ dataColRoomAdd, personalRoomAdd, personalClear, isAuthenticated, history }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [ch, setCh] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (ch) {
            history.push('/signin');
            setCh(false);
        }
    };

    useEffect(() => {
        personalClear();
    });

    const BtnOnClick = (e) => {
        console.log(e);
        let subTitle = e.toLowerCase();
        if (subTitle === 'collection') {
            if (isAuthenticated) {
                dataColRoomAdd(history);
            } else {
                setMsg('로그인 후 이용해주세요.');
                setCh(true);
                handleOpen();
            }
        } else if (subTitle === 'personal') {
            if (isAuthenticated) {
                personalRoomAdd(history);
            } else {
                setMsg('로그인 후 이용해주세요.');
                setCh(true);
                handleOpen();
            }
        } else if (subTitle === 'alice') {
            history.push('/alice/rooms');
        } else if (subTitle === 'translate') {
            history.push('/trans/rooms');
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
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
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Personalized emotional chat-voice bot
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Personalized conversation system considering personal preference Progressive personalized chat-voice bot with emotional
                    dialogue specialized for a user Deep learning-based artificial intelligence can provide a personalized counseling
                    service with knowledge and entertainment according to user interests
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {/* <Grid item key={'Alice'} key={'Alice'} xs={12} sm={'Alice' === 'Enterprise' ? 12 : 6} md={4}>
                        <Card>
                            <CardHeader
                                title={'Alice'}
                                subheader={'Alice'}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                action={'Alice' === 'Pro' ? <StarIcon /> : null}
                                className={'Alice'}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        {'Alice'}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary"></Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant={'Alice'} onClick={() => BtnOnClick('Alice')} color="primary">
                                    {'Alice'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid> */}
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            {tier.subTitle}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary"></Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        onClick={() => BtnOnClick(tier.subTitle)}
                                        color="primary"
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}

            {/* End footer */}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { dataColRoomAdd, personalRoomAdd, personalClear })(withRouter(Personal));
