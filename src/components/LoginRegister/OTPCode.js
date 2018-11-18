import React, { Component } from 'react';

import LeftView from './LeftView';

export default class OTPCode extends Component {
    
    render() {
        return (
            <div className="home-page">
            <div className="container page" style={styles.container}>
                <div className="row">
                    <LeftView/>
                    <div className="col-md-6" style={styles.right_page}></div>
                </div>
            </div>
            </div>
        );
    }
}

const styles = {
    container: {
        margin: 0, 
        minWidth: '100%',
        minHeight: '100vh',
        // height: '900px'
    },


    /*******    right page  ******/
    right_page: {
        paddingLeft: '135px',
    },
}