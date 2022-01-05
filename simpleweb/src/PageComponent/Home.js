import React, { useState } from "react";
import axios from "axios";

function Home(){
    
    const [inputs,setInputs]=useState({
        id: '',
        password:''
    });
    
    const {id,password} = inputs;

    const onChange =(e)=>{

        const {name,value} = e.target;
        const nextInputs = {
            ...inputs,
            [name] : value
        }
        setInputs(nextInputs);
    };

    function login(e){
        console.log(inputs.id)
        if( inputs.id===undefined||inputs.password===undefined){
            console.log("no id or password ");
            return;
        }else{
            axios.post('http://192.168.200.40:5000/login',{
                id: inputs.id,
                password:inputs.password
            })
            .catch(function(error){
                console.log(error);
            })
            .then((res)=>{
                console.log(res);
                if(res.status===200){
                    sessionStorage.setItem('id',inputs.id);
                }
                // alert(res);
            });
            setInputs({
                id: "",
                password: ""
            });
        }
        return document.location.href='/'
    }

    return(
        <div className="loginsession">
            <h1>Login Page</h1>
            <div className="idsession">
                <b>ID&nbsp;&nbsp;</b>
                <input name='id'type='text' placeholder="id" onChange={onChange} value={id}/>
            </div>
            <br></br>
            <div className="passwordseession">
                <b>Password</b>
                <input name='password'type='password' placeholder="password" onChange={onChange} value={password}/>
            </div>
            <br/>
            <button onClick={login}>로그인</button>
        </div>
    );
}

export default Home