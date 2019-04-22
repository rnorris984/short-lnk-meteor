import React from 'react';
import { Link } from 'react-router'; 
import { Accounts } from 'meteor/accounts-base'; 
 
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    decrement(){
        this.setState({
            count: this.state.count - 1
        });
    }
    onSubmit(e) {
        e.preventDefault();

        // using the 'ref value'
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9){
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser({email: email, password: password}, (err) => {
            if(err){
                this.setState({error: err.reason});
            }else{
                this.setState({error: ''}); 
            }
        });
    }
    render() {
      return (
          <div className="boxed-view">
           <div className="boxed-view__box">
                <h1>Join Short Lnk</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <p>{this.state.count}</p>

                    

                    <Link to="/">Already have an account?</Link>
            </div>
          </div>
      )
    }
  }