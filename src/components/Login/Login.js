import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleSignOut, handleGoogleSignIn, initializeLoginFramework, handleFbLogIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
const [user, setUser] = useState({
  isSignedIn : false,
  newUser: false,
  name : '', 
  email : '',
  password: '',
  photo: ''
});

initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

    const signOut = () => {
      handleSignOut()
      .then(res=>{
          handleResponse(res, false);

      })

    }

    const fbLogIn = () =>{
      handleFbLogIn()
      .then(res =>{
        handleResponse(res, true);
      })
    }

    const handleResponse = (res,redirect)=>{
      setUser(res);
      setLoggedInUser(res);
      if (redirect) {
        
      history.replace(from);
      }
    }

      const handleBlur = (e) => {
        let isFildValid=true;
if (e.target.name === 'email') {
  isFildValid = /\S+@\S+\.\S+/.test(e.target.value);

}
if (e.target.name=== 'password') {
  const isPasswordValid = e.target.value.length > 6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFildValid = isPasswordValid && passwordHasNumber;
}
if (isFildValid){
   const newUserInfo = {...user};
   newUserInfo[e.target.name]= e.target.value;
   setUser(newUserInfo);
}
      }
const handleSubmit = (e) =>{
  if (newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res =>{
      handleResponse(res, true);

    })
}

if (!newUser && user.email && user.password){
 signInWithEmailAndPassword(user.email, user.password)
 .then (res =>{
  handleResponse(res, true);
 })

}
   e.preventDefault();

}


  return (
  <div style = {{textAligi : 'enter',
  maxWidth: '450px',
	background: '#FAFAFA',
	padding: '30px',
	margin: '50px auto',
	boxShadow: '1px 1px 25px rgba(0, 0, 0, 0.35)',
	borderRadius: '10px',
	border: '6px solid #305A72'
  
  }}>

{
  user.isSignedIn ?
   <button onClick={signOut}>sign out</button> :
  
  <button onClick={googleSignIn}>Signin With Gmail</button>
  }
  <br/>
  <button onClick={fbLogIn}>Signin With Facebook</button>
{
  user.isSignedIn && <div>
    <p>welcome, {user.name} </p>
    <p> your email : {user.email}</p>
    <img src = {user.photo} alt=""/>
  </div>
}


<h1 style={{
textAlign:'center'

}}> Our own authentication</h1>
<input type="checkbox" onChange = {()=> setNewUser(!newUser)} name="newUser" id="" />
<label htmlFor="newUesr">New User Sign up </label>

<form onSubmit={handleSubmit}>
{newUser && <input name="name" type="text" onBlur={handleBlur} placeholder= "enter your name "/>
}
<br/>
<input type="text" onBlur={handleBlur} name="email" placeholder="enter your email address" required/>
<br/> 
<input type = "password"onBlur={handleBlur} name="password" placeholder= "enter your password" required/>
<br/>
<input type="submit" value= {newUser ? 'Sign Up' : 'Sign In'}/>
</form>
<p style = {{color: 'red'}}>{user.error}</p>
{user.success && <p style = {{color: 'green'}}> Account { newUser ? 'created' : 'Logged In'} successfully !</p>}
  </div>
      
  );
}

export default Login;
