import React, { Component, createRef } from 'react';
import classNames from 'classnames';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.parseValue(props.value, props.options) || {
                label:
                    typeof props.placeholder === 'undefined'
                        ? DEFAULT_PLACEHOLDER_STRING
                        : props.placeholder,
                value: '',
                name: typeof props.name === 'undefined' ? '' : props.name,
            },
            isOpen: false,
        };
        this.dropdownRef = createRef();
        this.mounted = true;
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.fireChangeEvent = this.fireChangeEvent.bind(this);
    }

    componentDidUpdate(prevProps) {
        // console.log(
        //     'componentDidUpdate',
        //     this.state,
        //     this.props.value,
        //     prevProps
        // );
        if (this.props.value !== prevProps.value) {
            if (this.props.value) {
                let selected = this.parseValue(
                    this.props.value,
                    this.props.options
                );
                if (selected !== this.state.selected) {
                    this.setState({ selected });
                }
            } else {
                console.log('reset');
                this.setState({
                    selected: {
                        label:
                            typeof this.props.placeholder === 'undefined'
                                ? DEFAULT_PLACEHOLDER_STRING
                                : this.props.placeholder,
                        value: '',
                        name:
                            typeof this.props.name === 'undefined'
                                ? ''
                                : this.props.name,
                    },
                });
            }
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick, false);
        document.addEventListener('touchend', this.handleDocumentClick, false);
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener('click', this.handleDocumentClick, false);
        document.removeEventListener(
            'touchend',
            this.handleDocumentClick,
            false
        );
    }

    handleMouseDown(event) {
        //console.log(event)
        if (this.props.onFocus && typeof this.props.onFocus === 'function') {
            this.props.onFocus(this.state.isOpen);
        }
        if (event.type === 'mousedown' && event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();

        if (!this.props.disabled) {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
    }

    parseValue(value, options) {
        let option;

        if (typeof value === 'string') {
            for (var i = 0, num = options.length; i < num; i++) {
                if (options[i].type === 'group') {
                    const match = options[i].items.filter(
                        (item) => item.value === value
                    );
                    if (match.length) {
                        option = match[0];
                    }
                } else if (
                    typeof options[i].value !== 'undefined' &&
                    options[i].value === value
                ) {
                    option = options[i];
                }
            }
        }

        return option || value;
    }

    setValue(value, label, name) {
        let newState = {
            selected: {
                value,
                label,
                name,
            },
            isOpen: false,
        };
        console.log(newState);
        this.fireChangeEvent(newState);
        this.setState(newState);
    }

    fireChangeEvent(newState) {
        if (
            newState.selected !== this.state.selected &&
            this.props.changeCounty
        ) {
            this.props.changeCounty(newState.selected.value);
            //this.props.onChange(newState.selected)
        }
        if (
            newState.selected !== this.state.selected &&
            this.props.changeDistrict
        ) {
            this.props.changeDistrict(newState.selected.value);
            //this.props.onChange(newState.selected)
        }
        if (newState.selected !== this.state.selected && this.props.onChange) {
            //this.props.onClick(newState.selected)
            this.props.onChange(newState.selected);
        }
    }

    renderOption(option, name) {
        let value = option.value;
        console.log(value);
        if (typeof value === 'undefined') {
            value = option.label || option;
        }
        let label = option.label || option.value || option;
        let isSelected =
            value === this.state.selected.value ||
            value === this.state.selected;

        const classes = {
            [`${this.props.baseClassName}-option`]: true,
            [option.className]: !!option.className,
            'is-selected': isSelected,
        };

        const optionClass = classNames(classes);

        return (
            <div
                key={value}
                value={value}
                name={name}
                className={optionClass}
                onMouseDown={this.setValue.bind(this, value, label, name)}
                onClick={this.setValue.bind(this, value, label, name)}
                role="option"
                aria-selected={isSelected ? 'true' : 'false'}
            >
                {label}
            </div>
        );
    }

    buildMenu() {
        let { options, baseClassName, name } = this.props;
        //console.log(this.props)
        let ops = options.map((option) => {
            if (option.type === 'group') {
                let groupTitle = (
                    <div className={`${baseClassName}-title`}>
                        {option.name}
                    </div>
                );
                let _options = option.items.map((item) =>
                    this.renderOption(item)
                );

                return (
                    <div
                        className={`${baseClassName}-group`}
                        key={option.name}
                        role="listbox"
                        tabIndex="-1"
                    >
                        {groupTitle}
                        {_options}
                    </div>
                );
            } else {
                return this.renderOption(option, name);
            }
        });

        return ops.length ? (
            ops
        ) : (
            <div className={`${baseClassName}-noresults`}>請先選擇縣市</div>
        );
    }

    handleDocumentClick(event) {
        if (this.mounted) {
            if (!this.dropdownRef.current.contains(event.target)) {
                if (this.state.isOpen) {
                    this.setState({ isOpen: false });
                }
            }
        }
    }

    isValueSelected() {
        return (
            typeof this.state.selected === 'string' ||
            this.state.selected.value !== ''
        );
    }

    render() {
        const {
            baseClassName,
            controlClassName,
            placeholderClassName,
            menuClassName,
            arrowClassName,
            arrowClosed,
            arrowOpen,
            className,
        } = this.props;

        const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
        const placeHolderValue =
            typeof this.state.selected === 'string'
                ? this.state.selected
                : this.state.selected.label;

        const dropdownClass = classNames({
            [`${baseClassName}-root`]: true,
            [className]: !!className,
            'is-open': this.state.isOpen,
        });
        const controlClass = classNames({
            [`${baseClassName}-control`]: true,
            [controlClassName]: !!controlClassName,
            [disabledClass]: !!disabledClass,
        });
        const placeholderClass = classNames({
            [`${baseClassName}-placeholder`]: true,
            [placeholderClassName]: !!placeholderClassName,
            'is-selected': this.isValueSelected(),
        });
        const menuClass = classNames({
            [`${baseClassName}-menu`]: true,
            [menuClassName]: !!menuClassName,
        });
        const arrowClass = classNames({
            [`${baseClassName}-arrow`]: true,
            [arrowClassName]: !!arrowClassName,
        });

        const value = (
            <div className={placeholderClass}>{placeHolderValue}</div>
        );
        const menu = this.state.isOpen ? (
            <div className={menuClass} aria-expanded="true">
                {this.buildMenu()}
            </div>
        ) : null;

        return (
            <div ref={this.dropdownRef} className={dropdownClass}>
                <div
                    className={controlClass}
                    onMouseDown={this.handleMouseDown.bind(this)}
                    onTouchEnd={this.handleMouseDown.bind(this)}
                    aria-haspopup="listbox"
                >
                    {value}
                    <div className={`${baseClassName}-arrow-wrapper`}>
                        {arrowOpen && arrowClosed ? (
                            this.state.isOpen ? (
                                arrowOpen
                            ) : (
                                arrowClosed
                            )
                        ) : (
                            <span className={arrowClass} />
                        )}
                    </div>
                </div>
                {menu}
            </div>
        );
    }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
