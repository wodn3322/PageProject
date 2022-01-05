import axios from "axios";
import React, { useState } from "react";

function UploadLayer(){

    const [inputValue,setValue]=useState({
        inputValue: ''
    });

    const {title} = inputValue;
    const {content} = inputValue;

    const onChange = (e) =>{
        const {name,value} = e.target;
        const nextValue ={
            ...inputValue,
            [name]:value
        };
        console.log(value);
        setValue(nextValue);
    };

    function upLoad(e) {
        console.log(sessionStorage.getItem("id"));
        axios.post('http://192.168.200.40:5000/upload',{
            id: sessionStorage.getItem('id'),
            title: title,
            content: content    
        })
        .catch(function(error){
            console.log(error);
        })
        .then((res)=>{
            console.log(res);
            if(res.status===200){
                console.log("post upload success!!");
            }
        });
            
        return;
    };


    return(
        <>
            <div>
                <b>제목 : </b>
                <input name="title" type='text' placeholder="제목을 입력하세요." onChange={onChange} value={title || ''} />
            </div>
            <div>
                <b>내용 </b><br/>
                <textarea name="content" placeholder="내용을 입력하세요." onChange={onChange} value={content || ''}
                />
            </div>
            {/* <div>
                <input></input>
            </div> */}
            <div>
                <button name="uploadbutton" onClick={upLoad}> 등록 </button>
            </div>

        </>
    );
}
export default UploadLayer;