import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
import API from '../../../API';
import LeftView from '../LeftView';
import '../Styles.css';

//for country phone code 
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';



import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
  } from '../../../constants/actionTypes';
  //'../constants/actionTypes'

  const mapStateToProps = state => ({ ...state.auth });

  const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onSubmit: (username, email, password) => {
      const payload = API.Auth.register(username, email, password);
      dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
      dispatch({ type: REGISTER_PAGE_UNLOADED })
  });
  
class Register extends Component {
    constructor() {
        super();

        this.changeUsername = ev => this.setState({username: ev.target.value});
        this.handlerPhone = (status, value, countryData, number, id) => {
            const phone_number = '+' + countryData.dialCode + number;
            this.setState({phone: phone_number});
          };
        
            
        this.state = {
            username: '',
            phone: '',
            error: '',
        };
      
    }

    submitForm = (username, phone) => ev => {
        ev.preventDefault();
        if (username.trim() === "") {
            this.setState({
                error: "username can't be blank"
            });
            return;
        }
        if (phone.trim() === "") {
            this.setState({
                error: "phone number can't be blank"
            });
            return;
        }

        return this.props.history.push('/otpcode'); //return <Redirect to='/otpcode' />
    }

    showError() {
        const {error} = this.state;
        
        if (error === '')
            return;
        return (
            <ul className="error-messages">
                <li>{error}</li>
            </ul>
        );

    }

    render() {
        const username = this.state.username;
        const phone = this.state.phone;
        return (
            <div className="container-page">
                <div className="row">
                
                    <LeftView/>

                    <div className="col-md-6 right-page">
                    
                        <p className="page-title">Create an Account</p>
                       
                        <div>
                            <form onSubmit={this.submitForm(username, phone)}>
                              <fieldset >

                                <p className="sub-title">Name</p>
                                
                                <fieldset className="form-group">
                                    <input 
                                        style={{height: '40px', fontSize:'16px'}}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Name"
                                        value={this.state.username}//value={this.props.username}
                                        onChange={this.changeUsername} 
                                    />
                                </fieldset>

                                <p className="sub-title">Phone Number</p>

                                <IntlTelInput 
                                    style={{width: '100%'}}
                                    defaultCountry={ 'id' }
                                    onPhoneNumberChange={ this.handlerPhone }
                                    onPhoneNumberBlur={ this.handlerPhone }
                                    css={['intl-tel-input', 'form-control']}
                                    utilsScript={'libphonenumber.js'} 
                                />

                                <div className="error-message">{this.showError()}</div>
                                
                                <button 
                                    className="btn btn-lg btn-activity-color"
                                    type="submit"
                                    // disabled={this.props.inProgress}
                                    >
                                    Sign up
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
                            Sign up with facebook
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


export default connect(mapStateToProps, mapDispatchToProps)(Register);