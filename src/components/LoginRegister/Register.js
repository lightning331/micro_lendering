import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
//import { Link } from 'react-router-dom';
import API from '../../API';
import LeftView from './LeftView';
//for country phone code 
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';



import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
  } from '../../constants/actionTypes';
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
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        
        this.changeUsername = ev => this.setState({username: ev.target.value}); //this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
            
        this.submitForm = (username, email, password) => ev => {
            ev.preventDefault();
            
            this.setState({submitClicked: true}) // this.props.onSubmit(username, email, password);
          }
        this.state = {
            submitClicked: false,
            username: '',
            phone: '',
        };
      
    }

    showError() {
        const username = this.state.username; 
        const phone = this.state.phone;
        
        if (this.state.submitClicked === false)
            return;
        if (username === undefined || username.trim() === "") {
            return (
            <ul className="error-messages">
                <li>username can't be blank</li>
            </ul>
            );
        }

        if (phone === undefined || phone.trim() === "") {
            return (
            <ul className="error-messages">
                <li>phone number can't be blank</li>
            </ul>
            );
        }

        //return <Redirect to='/otpcode' />
        this.props.history.push('/otpcode');
        
    }

    handlerPhone = (status, value, countryData, number, id) => {
        //console.log(status, value, countryData, number, id);
        const phone_number = '+' + countryData.dialCode + number;
        this.setState({
            phone: phone_number
        });

      };
    
    render() {
        const email = this.props.email;
        const password = this.props.password;
        const username = this.state.username;//this.props.username;
        console.log('username: ' + username)
        return (
            <div className="home-page">
            <div className="container page" style={styles.container}>
                <div className="row">
                    <LeftView/>

                    <div className="col-md-6" style={styles.right_page}>
                        <div style={styles.page_title}>
                            <p>Create an Account</p>
                        </div>
                       
                        <div>
                            <form onSubmit={this.submitForm(username, email, password)}>
                                <fieldset >
                                    <p style={styles.subitem}>Name</p>
                                    <fieldset className="form-group">
                                        <input style={{height: '40px', fontSize:'16px'}}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Name"
                                        value={this.state.username}//value={this.props.username}
                                        onChange={this.changeUsername} 
                                        />
                                    </fieldset>

                                    <p style={styles.subitem}>Phone Number</p>

                                    <IntlTelInput style={{width: '100%', height: '80%'}}
                                        defaultCountry={ 'id' }
                                        onPhoneNumberChange={ this.handlerPhone }
                                        onPhoneNumberBlur={ this.handlerPhone }
                                        css={['intl-tel-input', 'form-control']}
                                        utilsScript={'libphonenumber.js'} />
                                        
                                    {/* <PhoneInput
                                        placeholder="Enter phone number"
                                        value={ this.state.phone }
                                        onChange={ phone => this.setState({ phone }) } /> */}

                                    {/* <fieldset className="form-group">
                                        <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Phone Number"
                                        value={this.props.email}
                                        onChange={this.changeEmail} 
                                        />
                                    </fieldset> */}

                                    {/* <div style={{visibility: 'hidden'}}>
                                        <p style={styles.subitem}>Password</p>
                                        <fieldset className="form-group">
                                            <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={this.props.password}
                                            onChange={this.changePassword} 
                                            />
                                        </fieldset>
                                    </div> */}

                                {this.showError()}
                                
                                <button style={styles.btn_signup}
                                    className="btn btn-lg btn-primary"
                                    type="SIGN UP"
                                    // disabled={this.props.inProgress}
                                    >
                                    Sign up
                                </button>

                                <div style={styles.boundary_line}>
                                    <ColoredLine color="light_blue_grey" />
                                    <p>or</p>
                                    <ColoredLine color="light_blue_grey" />
                                </div>

                                </fieldset>
                            </form>

                        </div>
                            <button style={styles.btn_facebook}
                                className="btn btn-lg btn-primary"
                                type="Sign up with facebook"
                                // disabled={this.props.inProgress}
                                >
                            Sign up with facebook
                        </button>
                    </div>
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

    page_title: {
        fontSize: '24px',
        fontWeight:'bold',
        paddingTop: '120px',
        paddingBottom: '20px',
    },

    subitem: {
        marginTop:'30px',
        fontWeight:'bold',
        // color:'#344152'
    },

    btn_signup: {
        marginTop: '40px',
        backgroundColor: "#006f6c",
        borderColor: "#006f6c",
        width: '100%'
    },

    boundary_line: {
        display: 'flex', 
        marginTop: '40px', 
        marginBottom: '35px'
    },

    btn_facebook: {
        backgroundColor: "#3b5998",
        borderColor: "#3b5998",
        width: '100%'
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