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
import Checkbox from '@mui/material/Checkbox';

function TodoForm({ addTodo, selectedTags, handleTagFilterChange, handleResetFilters, setSortOption }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  // const [sortOption, setSortOption] = useState('');
  // const [selectedTags, setSelectedTags] = useState([]);

  const filteredTags = tags.filter((tag) => !selectedTags.includes(tag));

  

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

  // const handleSortOptionChange = (e) => {
  //   setSortOption(e.target.value);
  // };

  // const handleTagFilterChange = (e) => {
  //   const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setSelectedTags(selectedTags);
  // };

  // const handleResetFilters = () => {
  //   setSelectedTags([]);
  // };



  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
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
        <button style={{width: 380}} type="submit" onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </div>
    </Card>
    
    <Card style={{ width: 500, height: 100, marginTop: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => setSortOption('todo')}>todo</button>
          <button onClick={() => setSortOption('date')}>date</button>
        </div>
      </div>

    </Card>
    </div>
  );
}

function TodoList({ todos, toggleTodo, selectedTags, handleTagFilterChange}) {
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 5
  }}>
    <div>
      {todos.map((todo, index) => (
        <Card key={index} style={{ width: 500, height: 150 }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 'bold'
                }}
              >
                {todo.title}
              </Typography>
            </div>
            <Typography variant="body2" style={{marginLeft: 370}}>
              by {todo.dueDate}
            </Typography>
            <div>
              {todo.tags.map((tag, tagIndex) => (
                <button style={{ 
                  background: '#ffffff', 
                  borderWidth: '3px solid black', 
                  borderRadius: '5px',
                  display: 'flex', 
                  alignItems: 'center',
                  marginLeft: 40}} 
                  type="button"
                  > {tag}</button>
              ))}
            </div>
            
           
          </CardContent>
        </Card>
      ))}
    </div>
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

  const handleTagFilterChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTags(selectedTags);
  };

  const handleResetFilters = () => {
    setSelectedTags([]);
  };


  const filteredTodos = todos.filter((todo) => {
    if (selectedTags.length === 0) {
      return true;
    } else {
      return todo.tags.some((tag) => selectedTags.includes(tag));
    }
  });

  // const sortedTodos = [...filteredTodos].sort((a, b) => {
  //   if (sortOption === 'date') {
  //     return new Date(a.dueDate) - new Date(b.dueDate);
  //   } else if (sortOption === 'todo') {
  //     return a.todo === b.todo ? 0 : a.todo ? 1 : -1;
  //   } else {
  //     return 0;
  //   }
  // });
  if (sortOption === 'todo') {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'date') {
    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  return (
    <div>
      <TodoForm 
        addTodo={addTodo}
        selectedTags={selectedTags}
        handleTagFilterChange={handleTagFilterChange}
        handleResetFilters={handleResetFilters}
        setSortOption={setSortOption}
       />
      <TodoList 
        todos={filteredTodos} 
        toggleTodo={toggleTodo}
        selectedTags={selectedTags}
        handleTagFilterChange={handleTagFilterChange} />
    </div>
  );
}

export default App;


