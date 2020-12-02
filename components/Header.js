import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getHeader } from '../redux/actions/B2eFormAction'
import parse from 'html-react-parser'
import { mainWeb } from '../config/uri/client'

function mapDispatchToProps(dispatch) {
    return {
        getHeader: () => dispatch(getHeader()),
    }
}
export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            JsCss: '',
        }
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
            let res = await axios.get('http://hpapi-t01.eztravel.com.tw/v2/api/ezSpJsCss')
            let JsCss = res.data
            // this will re render the view with new data
            this.setState({
                JsCss: JsCss,
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                {parse(this.state.JsCss)}
                {this.props.header ? parse(this.props.header) : ''}
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        header: state.B2eFormReducer.header,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
