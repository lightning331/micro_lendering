import React, { Component } from 'react';
import LeftView from '../LeftView';
import '../Styles.css';
import PasswordField from 'material-ui-password-field'

//for country phone code 
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';


export default class Login extends Component {
    constructor() {
        super();

        this.handlerPhone = (status, value, countryData, number, id) => {
            const phone_number = '+' + countryData.dialCode + number;
            this.setState({phone: phone_number});
        };
        this.changePassword = ev => this.setState({password: ev.target.value});

        this.state = {
            phone: '',
            password: '',
            error: '',
        }
    }

    submitForm = (phone, password) => ev => {
        ev.preventDefault();

        if (phone.trim() === "") {
            this.setState({
                error: "phone number can't be blank"
            });
            return;
        }
        if (password.trim() === "") {
            this.setState({
                error: "password can't be blank"
            });
            return;
        }

        //return this.props.history.push('/otpcode');
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
        const password = this.state.password;
        const phone = this.state.phone;
        return (
            <div className="container-page">
                <div className="row">
                
                    <LeftView/>

                    <div className="col-md-6 right-page">
                    
                        {/* <div className="page-title"><p>Login</p></div> */}
                        <p className="page-title">Login</p>
                       
                        <div>
                            <form onSubmit={this.submitForm(phone, password)}>
                              <fieldset >

                                <p className="sub-title">Phone Number</p>
                                <IntlTelInput 
                                    style={{width: '100%'}}
                                    defaultCountry={ 'id' }
                                    onPhoneNumberChange={ this.handlerPhone }
                                    onPhoneNumberBlur={ this.handlerPhone }
                                    css={['intl-tel-input', 'form-control']}
                                    utilsScript={'libphonenumber.js'} 
                                />

                                <p className="sub-title">Password</p>
                                <PasswordField className="password-field"
                                    errorText="Your password is too short"
                                    onChange={this.changePassword} />

                                <div className="error-message">{this.showError()}</div>
                                
                                <button 
                                    className="btn btn-lg btn-activity-color"
                                    type="submit"
                                    // disabled={this.props.inProgress}
                                    >
                                    LOGIN
                                </button>

                                <div className="boundary-line">
                                    <ColoredLine color="light_blue_grey" />
                                    <p>or</p>
                                    <ColoredLine color="light_blue_grey" />
                                </div>

                              </fieldset>
                            </form>

                        </div>
                            <button 
                                className="btn btn-lg btn-facebook"
                                type="Sign up with facebook"
                                >
                            Login with facebook
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            width: '45%'
        }}
    />
);
