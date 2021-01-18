import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFooter } from '../redux/actions/B2eFormAction'
import parse from 'html-react-parser'
function mapDispatchToProps(dispatch) {
    return {
        getFooter: () => dispatch(getFooter()),
    }
}
export class Footer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.renderEzFooter()
    }
    renderEzFooter = async () => {
        try {
            this.props.getFooter()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return <>{this.props.footer && this.props.footer?.status !== -1 ? parse(this.props.footer) : ''}</>
    }
}

function mapStateToProps(state) {
    return {
        footer: state.B2eFormReducer.footer,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
