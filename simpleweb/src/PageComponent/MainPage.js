import React from "react";
import PostPage from "./UiComponent/PostPage";


function MainPage(){

    
    function logout(){
        sessionStorage.removeItem('id');
        document.location.href='/'
    }

    return (
        <div>
            <div>
                <b>{sessionStorage.getItem('id')} login success </b>
                <button onClick={logout}>로그아웃</button>
            </div>
            <div>
                <PostPage/>
            </div>
        </div>
    );
}

export default MainPage