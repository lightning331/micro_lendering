import React, { Component } from 'react';
import LeftView from '../LeftView';
import '../Styles.css';
import PasswordField from 'material-ui-password-field'

export default class MakePassword extends Component {
    constructor() {
        super();
        this.changePassword1 = ev => this.setState({password1: ev.target.value});
        this.changePassword2 = ev => this.setState({password2: ev.target.value});
        this.state = {
            password1: '',
            password2: '',
            error: ''
        }
    }

    submitForm = (password1, password2) => ev => {
        ev.preventDefault();
        if (password1.trim().length == 0 || password2.trim().length == 0) {
            this.setState({
                error: "Please fill the password"
            });
            return;
        }
        if (password1.trim() !==  password2.trim()) {
            this.setState({
                error: "Password doesn't match"
            });
            return;
        }
        //return this.props.history.push('/createpassword');
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
        const {password1, password2} = this.state;
        let passfilled = password1.trim().length > 0 && password2.trim().length > 0;

        return (
          <div className="container-page">
            <div className="row">

              <LeftView/>
              
              <div className="col-md-6 right-page">

                <p className='page-title'>Make a Password</p>
                <p className="text-description">Please make a password to Your acount</p>
                
                <form onSubmit={this.submitForm(password1, password2)}>

                    <p className="sub-title">Password</p>
                    <PasswordField
                        style={{width: '100%'}}
                        errorText="Your password is too short"
                        onChange={this.changePassword1} 
                    />

                    <p className="sub-title">Retype password</p>
                    <PasswordField
                        style={{width: '100%'}}
                        //hintText="At least 8 characters"
                        //floatingLabelText="Enter your password"
                        errorText="Your password is too short"
                        onChange={this.changePassword2} 
                    />

                    <div className="error-message">{this.showError()}</div>

                    <button
                        className={"btn btn-lg " + (passfilled ? "btn-activity-color" : "btn-inactivity-color")}
                        type="submit">
                        Submit
                    </button>

                </form>
              </div>
            </div>
          </div>
        );
    }
}
