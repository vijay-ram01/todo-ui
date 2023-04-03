import logo from './logo.svg';
import './App.css';
import { TextField, Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Button from '@mui/material';
import endPoints from './endpoints';
import axios from 'axios';

function App() {

  const [list, setList] = useState([]);
  // let data = [];

  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    axios({
      method: 'get',
      url: '/getList',
      responseType: 'stream'
    }).then(res => {
      setList(JSON.parse(res.data).data);
    })
  }, [])

  const addTodo = (toAdd) => {
    // axios({
    //   method: 'post',
    //   url: '/add',
    //   body: toAdd
    // }).then(res => {
    //   console.log("res =>>", res);
    // })
    axios.post("/add", {
      data: toAdd
    }). then(res => {
      console.log(res.data.data);
      setList(res.data.data);
    })
  }

  const ToDo = (props) => {
    const {todo} = props
    return (
      <ListItem className='listitem'>{todo}</ListItem>
    );
  }

  return (
    <div className="App">
      <div className='todoContaienr'>
        <div className='addbox'>
          <TextField id="outlined-basic" label="TODO" variant="outlined" value={todoValue} onChange={(e) => setTodoValue(e.target.value)}/>
          <Button variant="contained" onClick={() => {addTodo(todoValue); setTodoValue("");}}>Add</Button>
        </div>
        <div className='todoList'>
          <List>
            {
              (typeof list === 'undefined') ? 
                <p>Loading..</p>
                :
                list?.map(d => <ToDo todo={d} />)
            }
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
