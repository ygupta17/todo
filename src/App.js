// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleCreateTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() !== '' && dueDate.trim() !== '') {
      const newTodo = {
        title: title.trim(),
        tags: tags,
        dueDate: dueDate.trim(),
        completed: false,
      };

      addTodo(newTodo);

      setTitle('');
      setTags([]);
      setTagInput('');
      setDueDate('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }}>
    <Card style={{ width: 500, height: 300 }}>
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{marginTop: 30}}>
        <label style={{marginLeft: 50}}>
          Title
          <input style ={{marginLeft: 200, marginRight: 50}} type="text" value={title} onChange={handleTitleChange} required />
        </label>
        <br />
        </div>

        <div style={{marginTop: 30}}>
        <label style={{marginLeft: 50}}>
          Tags 
          <input style={{marginLeft: 90}} type="text" value={tagInput} placeholder="Ex) Grocery, School, ..." onChange={handleTagInputChange} />
          <button type="button" onClick={handleCreateTag}>Create new tag</button>
        </label>
        </div>

        <div style={{marginLeft: 50, marginTop: 30}}>
          {tags.map((tag, index) => (
            
              
              <button style={{marginRight: 5, background: '#ffffff', borderWidth: '3px solid black', borderRadius: '5px'}} type="button" onClick={() => handleDeleteTag(tag)}>x {tag}</button>
            
          ))}
        </div>

        <div style={{marginTop: 30}}>
        <label style={{marginLeft: 50}}>
          Due Date
          <input style={{marginLeft: 190, marginRight: 50}} type="date" value={dueDate} onChange={handleDueDateChange} required />
        </label>
        <br />
        </div>
        
        <div style={{marginLeft: 50, marginTop: 30}}>
        <button style={{width: 380}} type="submit">Create</button>
        </div>
      </form>
    </div>
    </Card>
    </div>
  );
}

function TodoList({ todos, toggleTodo }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index} style={{ backgroundColor: todo.completed ? '#eee' : '#fff' }} onClick={() => toggleTodo(index)}>
          <h3>{todo.title}</h3>
          <p>Due Date: {todo.dueDate}</p>
          <p>Tags: {todo.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };


  const filteredTodos = todos.filter((todo) => {
    if (selectedTags.length === 0) {
      return true;
    } else {
      return todo.tags.some((tag) => selectedTags.includes(tag));
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={sortedTodos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;


