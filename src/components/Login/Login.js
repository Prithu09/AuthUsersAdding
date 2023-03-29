import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = function (state , action)
{
  if(action.type === 'User_input')
  {
    return{value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'Input_blur')
  {
    return { value : state.value , isValid : state.value.includes('@') }
  }
return {value : '' , isValid: false};
};

const passwordReducer = function (state, action)
{
  if(action.type === 'User_input')
  {
    return{value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'Input_blur')
  {
    return { value : state.value , isValid : state.value.trim().length > 6 };
  }
return {value : '' , isValid: false};

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [ emailState , dispatchemailState] = useReducer(emailReducer,{value :'' , isValid : null} );


  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {value : '' , isValid : null});

  // useEffect(() => {
   

  // } ,[enteredEmail , enteredPassword])

  const emailChangeHandler = (event) => {
   dispatchemailState({type : 'User_input' , val : event.target.value})
    setFormIsValid(
      emailState.value.includes('@') && passwordState.isValid
    );
   
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'User_input' , val : event.target.value});

    setFormIsValid(
      emailState.isValid && emailState.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    dispatchemailState({type : 'Input_blur'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'Input_blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
