import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [List, setList] = useState([]);
  const [Value, setValue] = useState("");

  useEffect(() => {
    axios.get("/api/values").then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value: Value }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setList([...Value, res.data]);
      } else {
        alert("값을 db에 넣는데 실패했습니다");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {List & List.map((list, index) => <li key={index}>{list.value}</li>)}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요"
              onChange={changeHandler}
              value={Value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
