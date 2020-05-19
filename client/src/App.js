import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Home from './components/core/Home';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Menubar from './components/core/Menubar';
import ChatRoom from './components/chat/ChatRoom';
import DataChatRoom from './components/dataCollection/ChatRoom';
import ChatAliceRoom from './components/alice/ChatAliceRoom';
import AliceRoomNew from './components/alice/CreateAliceRoom';
import ChatAlice from './components/alice/ChatAliceChat';
import ChatTranslateRoom from './components/translate/ChatTramslateRoom';
import TransRoomNew from './components/translate/CreateTramslateRoom';
import ChatTrans from './components/translate/ChatTramslateChat';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AlertOn from './components/core/AlertOn';
import PrivateRoute from './routing/PrivateRoute';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Container maxWidth="lg">
                    <Menubar />
                    <AlertOn />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />
                        <PrivateRoute exact path="/alice/chat/:id" component={ChatAlice} />
                        <PrivateRoute exact path="/alice/rooms" component={ChatAliceRoom} />
                        <PrivateRoute exact path="/alice/new" component={AliceRoomNew} />

                        <PrivateRoute exact path="/trans/chat/:id" component={ChatTrans} />
                        <PrivateRoute exact path="/trans/rooms" component={ChatTranslateRoom} />
                        <PrivateRoute exact path="/trans/new" component={TransRoomNew} />

                        <PrivateRoute exact path="/parsonal/room/:id" component={ChatRoom} />
                        <PrivateRoute exact path="/dataCol/room/:id" component={DataChatRoom} />

                    </Switch>
                </Container>
            </Router>
        </Provider>
    );
};

export default App;
