import React, { Component } from 'react';

import Cooparation from '../../public/images/icon-cooparation.svg';
export default class FormHeader extends Component {
    render() {
        return (
            <div className="section">
                <Cooparation alt="logo" />
                <h1>{this.props.title}</h1>
                <p>{this.props.desc}</p>
                <p>* 為必填欄位</p>
            </div>
        );
    }
}
