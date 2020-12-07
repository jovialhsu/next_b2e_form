import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getHeader, getEzJsCss } from '../redux/actions/B2eFormAction'
import parse from 'html-react-parser'
import { mainWeb } from '../config/uri/client'

function mapDispatchToProps(dispatch) {
    return {
        getHeader: () => dispatch(getHeader()),
        getEzJsCss: () => dispatch(getEzJsCss()),
    }
}
export class Header extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.renderEzJsCss()
        this.renderHeader()
    }
    renderHeader = async () => {
        try {
            this.props.getHeader()
        } catch (err) {
            console.log(err)
        }
    }
    renderEzJsCss = async () => {
        try {
            this.props.getEzJsCss()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                {this.props.EzJsCss ? parse(this.props.EzJsCss) : ''}
                {this.props.header ? parse(this.props.header) : ''}
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        header: state.B2eFormReducer.header,
        EzJsCss: state.B2eFormReducer.EzJsCss,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
