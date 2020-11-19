import React, { Component } from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            ezFooter: '',
        }
    }
    componentDidMount() {
        this.renderEzFooter()
    }
    renderEzFooter = async () => {
        try {
            let res = await axios.get('http://hpapi-t01.eztravel.com.tw/v1/api/ezSpFooter')
            let ezFooter = res.data
            // this will re render the view with new data
            this.setState({
                ezFooter: ezFooter,
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return <>{parse(this.state.ezFooter)}</>
    }
}
