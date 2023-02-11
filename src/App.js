import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [datalist, setDatalist] = useState([]);
  const [userId, setUserId] = useState("");
  const [edit, setEdit] = useState(false);
  const [indexValue, setIndexValue] = useState(null);

  async function handleclick() {
    const api = "http://localhost:3000/api/auth";
    const dataPayload = {
      email,
      password,
    };

    await axios
      .post(api, dataPayload)
      .then((res) => {
        const newData = [...datalist, res.data];
        setDatalist([...newData]);
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
  }

  useEffect(() => {}, [`${datalist.toString()}`]);

  async function getData() {
    const api = "http://localhost:3000/api/auth";
    const mani = await axios.get(api);
    setDatalist(mani.data);
  }
  useEffect(() => {
    getData();
  }, []);

  async function handledel({ id, i }) {
    console.log(i);
    const api = "http://localhost:3000/api/auth";
    const deldata = await axios
      .delete(api, id)
      .then((res) => console.log("delete ho gaya"))
      .catch((err) => console.log(err));

    const removedata = [...datalist];
    removedata.splice(i, 1);
    setDatalist(removedata);
  }
  function updatefun({ email, password, id, index }) {
    setEmail(email);
    setPassword(password);
    setUserId(id);
    setIndexValue(index);
  }

  async function handleEdit(id, index) {
    const api = "http://localhost:3000/api/auth";
    const data = {
      email,
      password,
      userId,
    };

    await axios
      .put(api, data)
      .then((res) => {
        const tempDataList = [...datalist];

        tempDataList[indexValue].email = email;
        tempDataList[indexValue].password = password;

        setDatalist(tempDataList);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <div>
        <input
          value={email}
          onChange={(a) => setEmail(a.target.value)}
          placeholder="enter your email"
        />
        <input
          value={password}
          onChange={(a) => setPassword(a.target.value)}
          placeholder="enter your password"
        />
        <button onClick={handleclick}>submit</button>
        <button onClick={handleEdit}>pencle</button>
      </div>
      {datalist?.map((item, i) => {
        return (
          <div key={i}>
            {" "}
            <p>{item.email}</p>
            <button onClick={() => handledel({ id: item.id, i: i })}>
              delete data
            </button>
            <button
              onClick={() =>
                updatefun({
                  email: item.email,
                  password: item.password,
                  id: item._id,
                  index: i,
                })
              }
            >
              update
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
