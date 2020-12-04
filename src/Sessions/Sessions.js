import React, { Component } from 'react';
import './Sessions.css'

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'sessions': [],
            'selected': '',
        };
    }

    componentDidMount() {
        this.setState({ sessions: this.props.sessions, selected: this.props.sessions[0] });
    }

    select(event) {
        for (let session in this.state.sessions) {
            if (this.state.sessions[session].name === event.target.innerText) {
                this.setState({ selected: this.state.sessions[session] });
                break;
            }
        }
    }

    toggleList() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { id, value, sessions, handleChange } = this.props;
        return (
            <div
                className="sessionsContainer"
                id={id}
                value={value}
            >
                <div
                    className="sessionsHeader"
                    onClick={this.toggleList.bind(this)}
                >
                    {this.state.selected.name}
                </div>
                {this.state.open && (
                    <div className="sessionsListContainer">
                        {sessions && sessions.map(session => (
                            <div
                                className="sessionsListItem"
                                key={session.name}
                                onClick={(e) => {
                                    this.toggleList();
                                    this.select(e);
                                    handleChange(e);
                                }}
                            >
                                {session.name}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        );
    }
}

export default Sessions;
