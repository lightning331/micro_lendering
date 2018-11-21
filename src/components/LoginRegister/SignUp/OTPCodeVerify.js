import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import '../Styles.css';
import LeftView from '../LeftView';

const CODEINPUTS = 4;

export default class OTPCode extends Component {
    constructor() {
        super();

        this.changecode = ev => this.setState({otpcode: ev.target.value});

        this.state = {
            otpcode: '',
            error: '',
        };
    }

    submitForm = (code) => ev => {
        ev.preventDefault();
        if (code.trim().length !== 4) {
            this.setState({
                error: "please fill the codes"
            });
            return;
        }
        return this.props.history.push('/createpassword');
    }

    showError() {
        const {error} = this.state;
        
        if (error === '')
            return;
        return (
            <ul className="error-messages" style={{}}>
                <li>{error}</li>
            </ul>
        );

    }

    render() {
        const otpcode = this.state.otpcode;
        let validcode = otpcode.trim().length === CODEINPUTS;
        console.log('validcode: ' + validcode)
        
        return (
            <div className="container-page">
                <div className="row">

                    <LeftView/>

                    <div className="col-md-6 right-page">

                        <p className="page-title">Enter the Code</p>
                        <p className="text-description">We have sent a code to +62 857345***</p>
                            
                        <div style={{marginTop: '60px'}}>
                            <form onSubmit={this.submitForm(otpcode)}>

                                <OtpInput
                                    inputStyle={styles.otpstyle}
                                    onChange={otp => this.setState({otpcode: otp})} 
                                    numInputs={CODEINPUTS}
                                    separator={<span>-</span>}
                                 />

                                 <div style={{marginTop: '50px'}}>
                                    <button
                                        className={"btn btn-lg " + (validcode ? "btn-activity-color" : "btn-inactivity-color")}
                                        type="submit">
                                        NEXT
                                    </button>
                                </div>

                            </form>
                        </div>
                        
                        <div className="error-message">
                            {this.showError()}
                        </div>

                        <div style = {{marginTop: '217px', textAlign: 'center'}}>
                            <p className="text-description">I didn't got the code</p>
                            <button className="btn btn-lg btn-code-resend">RESEND</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    otpstyle: {
        width: '60px',
        height: '60px',
        margin: '0 0.7rem',
        fontSize: '1.5rem',
        borderRadius: 4,
        backgroundColor: '#f7f9ff',
        border: '1px solid rgba(0,0,0,0.1)',
    },
}