import React, { useRef, useState, useEffect } from "react";
import Bg from "./Bg";
import eye from "/icons/eye.svg";
import eyeSlash from "/icons/eye-slash.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import logo from "/password.png"


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard :' + " " + text, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    navigator.clipboard.writeText(text);
  }

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      ref.current.src = eye;
      passwordRef.current.type = "text";
    } else {
      ref.current.src = eyeSlash;
      passwordRef.current.type = "password";
    }
  };

  const showTablePassword = () => {
    if (passwordRef.current.type === "password") {
      ref.current.src = eye;
      passwordRef.current.type = "text";
    } else {
      ref.current.src = eyeSlash;
      passwordRef.current.type = "password";
    }
  };
  
  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // await fetch('http://localhost:3000/', { method: 'DELETE' , headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({id: form.id}) });
      
      setPasswordArray([...passwordArray, {...form, id: uuidv4() }]);
      await fetch('http://localhost:3000/', { method: 'POST' , headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({...form, id: uuidv4()}) });
      

      setForm({ site: "", username: "", password: "" });

      toast('Saved Password Successfully !', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
  
      // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    }
    else {
      alert('Your input should be > 3 characters !')
    }

  };
  
  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));

      let res = await fetch('http://localhost:3000/', { method: 'DELETE' , headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({id}) });

      toast('Deleted Password Successfully !', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });

      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    }

  };

  const editPassword = (id) => {
    setForm({...passwordArray.filter(i => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  }; 
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value });
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transitio = "Bounce" /><ToastContainer />
      <Bg />
      <img src={logo} alt="logo" className='absolute mx-5 mt-14 z-0 w-72' />
      <div className="flex flex-col p-20 mt-40 space-y-5">
        <form onSubmit={savePassword} className="flex flex-col space-y-5 bg-white/[0.2] backdrop-blur-sm border border-[#814aff] p-10 z-10 rounded-2xl shadow-lg shadow-[#f0ebff]">
          <div className="flex-col mb-5">
            <p className="text-3xl font-medium text-[#5c1cf1]">
              Save your passwords secure !
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              Your own password Manager.
            </p>
          </div>
          <input type="url" value={form.site} id="site" name="site" onChange={handleChange} className="p-2 px-5 bg-transparent border border-[#5c1cf1] outline-none rounded-full placeholder:text-zinc-500 shadow-lg shadow-[#f0ebff]" placeholder="Enter URL"/>
          <div className="flex space-x-5">
            <input type="text" value={form.username} id="username" name="username" onChange={handleChange} className="p-2 px-5 bg-transparent border border-[#5c1cf1] outline-none rounded-full placeholder:text-zinc-500 shadow-lg shadow-[#f0ebff] w-full" placeholder="Username"/>

            <div className="flex items-center px-5 border border-[#5c1cf1] rounded-full shadow-lg shadow-[#f0ebff] w-full">
              <input ref={passwordRef} type="password" value={form.password} id="password" name="password" onChange={handleChange} className="p-2 bg-transparent placeholder:text-zinc-500 outline-none w-full" placeholder="Password" />
              <img src={eyeSlash} ref={ref} onClick={showPassword} className="hover:cursor-pointer w-5" alt="icon"></img>
            </div>
          </div>
          <button type="submit" className="flex items-center justify-center space-x-2 p-2 rounded-full hover:text-white border border-[#5c1cf1] hover:bg-[#5c1cf1] shadow-lg shadow-[#f0ebff] hover:shadow-[#c3afff] w-40">
            <i className="fa-regular fa-square-plus"></i>
            <p>Add Password</p>
          </button>
        </form>

        <div className="flex-col space-y-5 text-base bg-white/[0.2] backdrop-blur-sm border border-[#814aff] p-10 rounded-2xl shadow-lg shadow-[#f0ebff]">
          <p className="text-2xl font-medium">Your saved passwords</p>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto border border-[#dacaff] w-full">
              <thead className="bg-[#a680ff] text-center">
                <tr className="text-lg text-white">
                  <th className="text-start p-2 px-5 w-1/2">Site</th>
                  <th className="p-2 px-5">User Name</th>
                  <th className="p-2 px-5">Password</th>
                  <th className="p-2 px-5">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className="text-base">
                      <td className="p-2 px-5 text-start"><a href={item.site} target="_blank" rel="noreferrer" className="hover:text-blue-600 cursor-pointer">{item.site}</a><button className="iconCopy" onClick={() => {copyText(item.site)} }><i className="fa-solid fa-copy ml-5 hover:text-[#814aff]"></i></button></td>
                      <td className="p-2">{item.username}<button className="iconCopy" onClick={() => {copyText(item.username)} }><i className="fa-solid fa-copy ml-5 hover:text-[#814aff]"></i></button></td>

                      <td className="p-2">{"*".repeat(item.password.length)}<button className="iconCopy" onClick={() => {copyText(item.password)} }><i className="fa-solid fa-copy ml-5 hover:text-[#814aff]"></i></button></td>



                      <td className="p-2 space-x-5">
                        <button onClick={() => {editPassword(item.id)} }><i className="fa-solid fa-pen p-2 hover:bg-transparent/[0.1] hover:text-[#814aff] rounded-full"></i></button>
                        <button onClick={() => {deletePassword(item.id)} }><i className="fa-regular fa-trash-can p-2 hover:bg-transparent/[0.1] hover:text-[#814aff] rounded-full"></i></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
