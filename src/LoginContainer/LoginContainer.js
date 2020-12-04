import React, { Component } from 'react';
import { PowerSettingsNew, Replay } from '@material-ui/icons';
import Dropdown from '../Dropdown/Dropdown';
import Sessions from "../Sessions/Sessions";
import './LoginContainer.css';
import classNames from 'classnames';

const menuI = {
    fontSize: "3.5vmin",
    color: "#cccccc"
}

async function wait(fun, time, ...args) {
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(time);
    return fun(...args);
}

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': window.lightdm.users,
            'user': window.lightdm.users[0],
            'password': '',
            'sessions': window.lightdm.sessions,
            'session': '',
            'isInAuth': false,
            'validateStatus': '',
            'warningText': '',
        };

        window.lightdm.authenticate(this.state.user.name);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    submit(e) {
        e.preventDefault();
        let password = this.state.password;
        if (password) {
            this.setState({
                validateStatus: '',
                warningText: ''
            });
            window.lightdm.respond(password);
            this.startDefaultSession();
        } else {
            this.setState({
                validateStatus: 'warning',
                warningText: 'No password.'
            });
        }
    }

    focusLoginScreen() {
        if (this.loginScreen) {
            this.loginScreen.focus();
        }
    }

    handleChangeUser(event) {
        for (let user in this.state.users) {
            if (this.state.users[user].real_name === event.target.innerText) {
                this.setState({ user: this.state.users[user] });
                this.cancelAuthentication();
                break;
            }
        }
    }

    handleChangePass(event) {
        if (event.key === 'Enter') {
            this.submit();
        }
        this.setState({
            password: event.target.value,
            validateStatus: '',
            warningText: ''
        });
    }

    handleChangeSession(event) {
        for (let session in this.state.sessions) {
            if (this.state.sessions[session].name === event.target.innerText) {
                this.setState({ session: this.state.sessions[session] });
                break;
            }
        }
    }

    handleKeyPress(event) {
        if (event.keyCode === 27) {
            this.cancelAuthentication();
        }
    }

    cancelAuthentication() {
        window.lightdm.cancel_authentication();
        this.setState({ password: '' });
        this.setState({ isInAuth: false });
        window.lightdm.authenticate(this.state.user.name);
    }

    startDefaultSession(count = 0) {
        if (window.lightdm.is_authenticated) {
            window.lightdm.start_session_sync(this.state.session.key || '');
        } else if (count === 0 || (count < 5 && this.state.isInAuth)) {
            this.setState({ isInAuth: true });
            this.focusLoginScreen();
            wait(this.startDefaultSession.bind(this), 2 ** count * 1000, count + 1);
        } else {
            this.cancelAuthentication();
            this.setState({
                validateStatus: 'warning',
                warningText: 'Login Failed.'
            });
            document.getElementById('pass').focus();
        }
    }

    render() {
        const buttonStyles = classNames({
            'loginBtn': true,
            'loading': this.state.isInAuth
        });
        const passwordStyles = classNames({
            'password': true,
            'error': this.state.validateStatus
        });
        return (
            <div
                onKeyDown={this.handleKeyPress}
                className="container"
                ref={loginScreen => {
                    this.loginScreen = loginScreen;
                }}
            >
                <div className="loginForm">
                    <header className="header">
                        <h1>LOGIN</h1>
                    </header>
                    <form onSubmit={this.submit.bind(this)}>
                        <label htmlFor="user">USER</label>
                        <Dropdown
                            items={this.state.users}
                            id="user"
                            handleChange={this.handleChangeUser.bind(this)}
                            value={this.state.user}
                        />
                        <label htmlFor="pass">PASSWORD</label>
                        <input
                            id="pass"
                            type="password"
                            className={passwordStyles}
                            onChange={this.handleChangePass.bind(this)}
                            value={this.state.password}
                        />
                        <button
                            className={buttonStyles}
                        >
                            {this.state.isInAuth ? (
                                <div className="loader"></div>
                            ) : (
                                    <span>SIGN IN</span>
                                )
                            }
                        </button>
                        <div className="session">
                            <Sessions
                                id="session"
                                sessions={this.state.sessions}
                                value={this.state.session}
                                handleChange={this.handleChangeSession.bind(this)}
                            />
                        </div>
                    </form>
                </div>
                <div className="banner">
                    <div className="menu">
                        <button
                            className="mItem"
                            onClick={() => window.lightdm.shutdown()}
                        >
                            <PowerSettingsNew style={menuI} />
                        </button>
                        <button
                            className="mItem"
                            onClick={() => window.lightdm.restart()}
                        >
                            <Replay style={menuI} />
                        </button>
                    </div>
                    <span className="nihongo">お帰りなさい</span>
                </div>
            </div>
        );
    }

}

export default LoginContainer;