import React, { useRef, useState, useEffect } from "react";

// interface FormInPut {
//     name: string;
    
//   }

// export const Signup = () => {
//     const [formInPut, setFormInput] = useState<FormInPut>({
//         name: "",
//       });

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch("http://localhost:5001/api/newplayer", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(formInPut),
//             });
//             if (response.ok) {
//               return response;
//             }
//             // if (!response.ok) {
//             //   throw new Error(`HTTP error! Status: ${response.status}`);
//             // }
//             const data = await response.json();
//             setFormInput(data);
//           } catch (error) {
//             console.error("Error sending request:", error);
//           }
//         };
//         fetchData();
//       }, [formInPut]);
    
//       const inputForm = useRef<HTMLFormElement>(null);
    
//       const submitInput = (event: React.FormEvent<HTMLFormElement>) => {
//         const formData = new FormData(inputForm.current!);
//         if (!formData.get("First_name") || !formData.get("Last_name")) {
//           alert("Please fill in all the fields");
//         } else {
//           const name = `${formData.get("First_name")} ${formData.get("Last_name")}`;
//           setFormInput({ name });
//           inputForm.current!.reset();
//         }
//       };
    
//       const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
//         if (event.key === "Enter") {
//           submitInput(event);
//         }
//       };

//   return (
//     <div>
//     <h2 className="app__tittle">Registerer</h2>
//     <form
//       className="input__form"
//       id="addDeveloperForm"
//       onSubmit={submitInput}
//       ref={inputForm}
//     >
//       <label>First name:</label>
//       <input
//         type="text"
//         className="input__form--name addDeveloperFirstNameInput"
//         name="First_name"
//         placeholder="Enter first name"
//       ></input>
//       <label>Last name:</label>
//       <input
//         type="text"
//         className="input__form--name addDeveloperLastNameInput"
//         name="Last_name"
//         placeholder="Enter last name"
//       ></input>
//       <button
//         className="Bootcamp__selecter--button addDeveloperBtn"
//         id="addDeveloperBtn"
//         type="submit"
//       >
//         Sign Up
//       </button>
//     </form>
//    </div>

//   )
// }

// export default Signup;
