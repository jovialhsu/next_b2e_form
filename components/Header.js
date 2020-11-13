import React, { Component } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            ezHeader: '',
            JsCss: '',
        };
    }
    componentDidMount() {
        this.renderEzJsCss();
        this.renderPosts();
    }
    renderPosts = async () => {
        try {
            let res = await axios.get(
                'http://hpapi-t01.eztravel.com.tw/v1/api/ezSpHeader'
            );
            let ezHeader = res.data;
            // this will re render the view with new data
            this.setState({
                ezHeader: ezHeader,
            });
        } catch (err) {
            console.log(err);
        }
    };
    renderEzJsCss = async () => {
        try {
            let res = await axios.get(
                'http://hpapi-t01.eztravel.com.tw/v2/api/ezSpJsCss'
            );
            let JsCss = res.data;
            // this will re render the view with new data
            this.setState({
                JsCss: JsCss,
            });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <>
                {parse(this.state.JsCss)}
                {parse(this.state.ezHeader)}
            </>
        );
    }
}
