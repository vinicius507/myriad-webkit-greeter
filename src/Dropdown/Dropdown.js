import React, { Component } from 'react';
import classNames from 'classnames';
import './Dropdown.css';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'items': [],
            'selected': '',
            'open': false
        };
    }

    componentDidMount() {
        this.setState({ items: this.props.items, selected: this.props.items[0] });
    }

    toggleList() {
        this.setState({ open: !this.state.open });
    }

    select(event) {
        for (let item in this.state.items) {
            if (this.state.items[item].real_name === event.target.innerText) {
                this.setState({ selected: this.state.items[item] });
                break;
            }
        }
    }

    render() {

        const { id, value, items, handleChange } = this.props;

        const headerStyle = classNames({
            'menuHeader': true,
            'menuHeaderActive': this.state.open
        });

        return (
            <div
                className="menuContainer"
                id={id}
                value={value}
            >
                <div
                    className={headerStyle}
                    onClick={this.toggleList.bind(this)}
                >
                    {this.state.selected.real_name}
                </div>
                {this.state.open && (
                    <div
                        className="listContainer"
                    >
                        {items && items.map(item => (
                            <div
                                className="listItem"
                                key={item.name}
                                onClick={event => {
                                    this.toggleList();
                                    this.select(event);
                                    handleChange(event);
                                }}
                            >
                                {item.real_name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Dropdown;
