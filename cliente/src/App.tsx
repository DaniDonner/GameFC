import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from "./Gallery";
// import Signup from './Signup';

interface FormInPut {
  name: string;
  
}

interface LogeInPut {
  name: string ,
  password: string ,
}

function App() {


  const [formInPut, setFormInput] = useState<FormInPut>({
    name: '',
  });

  const [logeInPut, setLogeInput] = useState<LogeInPut>({
    name:'',
    password:''
    }
  )
  const [logeIn, setLogeIn] = useState(false)
  const [InputToggle, setInputToggle] = useState(false)
  const [SignInToggle, setSignInToggle] = useState(true)

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/newplayer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formInPut),
        });
        if (response.ok) {
          return response;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // const data = await response.json();
        // setFormInput(data);
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };
    fetchData();
  }, [formInPut]);

  useEffect(() => {
    const fetchData = async () => {
   
      try {
        const response = await fetch(`http://localhost:5001/api/player/${logeInPut.name}`);
        console.log("hello",logeInPut.name)
        const vallidation = await response.json();
        console.log("app",vallidation.Name)
        if (vallidation.name === logeInPut) {
          setLogeIn(true);
        }
        else alert("wrong login or password")
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };
    fetchData();
  }, [logeInPut]);

  const inputForm = useRef<HTMLFormElement>(null);

  const submitInput = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(inputForm.current!);
    if (!formData.get("First_name") || !formData.get("Last_name")) {
      alert("Please fill in all the fields");
    } else {
      const name = `${formData.get("First_name")} ${formData.get("Last_name")}`;
      setFormInput({ name });
      setLogeIn(true)
      // setSignInToggle(false)
      console.log(name)
      inputForm.current!.reset();
    }
  };
  const Signinform = useRef<HTMLFormElement>(null);
  const signin = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(Signinform.current!);
      const name = formData.get("Name") as string
      const password = formData.get("Password") as string
      setLogeInput({name,password})
      console.log(name)
      Signinform.current!.reset();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    
    if (event.key === "Enter") {
      submitInput(event);
    }
  };
  

  const Register = ( )=> {
    
    setInputToggle(true)
    setSignInToggle(false)
    
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <h1>GameFC</h1>
      </header>
      <div>
      {InputToggle  && <div>
      <h2 className="app__tittle">Registerer</h2>
      <form
      className="input__form"
      id="addDeveloperForm"
      onSubmit={submitInput}
      ref={inputForm}
    >
      <label>Name:</label>
      <input
        type="text"
        className="input__form--name addDeveloperFirstNameInput"
        name="First_name"
        placeholder="Enter first name"
      ></input>
      <label>Password:</label>
      <input
        type="text"
        className="input__form--name addDeveloperLastNameInput"
        name="Last_name"
        placeholder="Enter last name"
      ></input>
      <button
        className="Bootcamp__selecter--button addDeveloperBtn"
        id="addDeveloperBtn"
        type="submit"
      >
        Sign Up
      </button> 
    </form>
    </div>}
    {SignInToggle  &&<div>
    <h2 className="app__tittle">Login</h2>
    <form
      className="Signin__form"
      id="addDeveloperForm"
      onSubmit={signin}
      ref={Signinform}
    >
      <label>Name:</label>
      <input
        type="text"
        className="input__form--name addDeveloperFirstNameInput"
        name="Name"
        placeholder="Enter your name"
      ></input>
      <label>Last name:</label>
      <input
        type="password"
        className="input__form--name addDeveloperLastNameInput"
        name="password"
        placeholder="Enter you password"
      ></input>
      <button
        className="Bootcamp__selecter--button addDeveloperBtn"
        id="addDeveloperBtn"
        type="submit"
      >
        Sign in
      </button>
    </form>
    </div>}
    <button onClick={Register} >register</button>
   </div>
   {logeIn &&<div> 
      <Gallery {...formInPut} />
      </div>}
    </div>
  );
}

export default App;
