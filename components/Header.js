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
        // this.state = {
        //     JsCss: '',
        // }
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
            console.log('123')
            //let res = await axios.get('http://hpapi-t01.eztravel.com.tw/v2/api/ezSpJsCss')
            //let JsCss = res.data
            this.props.getEzJsCss()
            // this will re render the view with new data
            // this.setState({
            //     JsCss: JsCss,
            // })
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
