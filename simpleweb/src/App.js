import { useEffect, useState } from "react";
import Home from "./PageComponent/Home";
import MainPage from "./PageComponent/MainPage";


function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem('id')==null){
      console.log("islogin?? :",isLogin);
    }else{
      setIsLogin(true);
      console.log("islogin?? :",isLogin);
    }
  })


  return (
    <div className="App">
      {isLogin? <MainPage/>:<Home/>}
    </div>
  );
}

export default App;
