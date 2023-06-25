
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function TodoForm({ addTodo, selectedTags, handleTagFilterChange, handleResetFilters, setSortOption }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filterTags, setFilterTags] = useState([])
 
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
      setFilterTags([...filterTags, tagInput])
    }
  };

  const handleDeleteTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  //if title and date entered create card otherwise alert user to enter title and/or date
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() !== '') {
      if (dueDate.trim() !== '') {
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
      } else {
          alert('Please enter a due date.');
      }
    } else {
        alert('Please enter a title.');
    }
  };


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
        <label style={{marginLeft: 50, color: '#2944cc'}}>
          Title
          <input style ={{marginLeft: 200, marginRight: 50}} type="text" value={title} onChange={handleTitleChange} required />
        </label>
        <br />
        </div>

        <div style={{marginTop: 30}}>
        <label style={{marginLeft: 50, color: '#2944cc'}}>
          Tags 
          <input style={{marginLeft: 90}} type="text" value={tagInput} placeholder="Ex) Grocery, School, ..." onChange={handleTagInputChange} />
          <button style={{backgroundColor: '#a5d4e8', color: '#2944cc'}} type="button" onClick={handleCreateTag}>Create new tag</button>
        </label>
        </div>

        <div style={{marginLeft: 50, marginTop: 30}}>
          {tags.map((tag, index) => (
              <button style={{marginRight: 5, background: '#ffffff', borderWidth: '3px solid black', borderRadius: '5px', color: '#2944cc'}} 
              type="button" 
              onClick={() => handleDeleteTag(tag)}>
                x {tag}</button>  
          ))}
        </div>

        <div style={{marginTop: 30}}>
        <label style={{marginLeft: 50, color: '#2944cc'}}>
          Due Date
          <input style={{marginLeft: 190, marginRight: 50}} type="date" value={dueDate} onChange={handleDueDateChange} required />
        </label>
        <br />
        </div>
        
        <div style={{marginLeft: 50, marginTop: 30}}>
        <button style={{width: 380, backgroundColor: '#a5d4e8', color: '#2944cc'}} type="submit" onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </div>
    </Card>
    
    <Card style={{ width: 500, height: 100, marginTop: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button style={{backgroundColor: '#a5d4e8', color: '#2944cc'}} onClick={() => setSortOption('todo')}>todo</button>
          <button style={{backgroundColor: '#a5d4e8', color: '#2944cc'}} onClick={() => setSortOption('date')}>date</button>
        </div>
      </div>
    </Card>

      <Card style={{ width: 500, height: 100, }}>
        <div style={{display: 'flex',
justifyContent: 'center',
alignItems: 'center'}}>
        <FormControl>
          <Select
            style={{color: '#2944cc'}}
            multiple
            value={selectedTags}
            onChange={handleTagFilterChange}
          >
            {filterTags.map((tag) => (
              <MenuItem key={tag} value={tag} style={{color: '#2944cc'}}>
                {tag}
              </MenuItem>
            ))}
          </Select>
          <div>
            <button style={{backgroundColor: '#a5d4e8', color: '#2944cc'}} onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </FormControl>
        </div>
      </Card>
    </div>
  );
}

function TodoList({ todos, toggleTodo, selectedTags}) {
  
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
                style={{color: '#2944cc'}}
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <Typography
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 'bold', color: '#2944cc'
                }}
              >
                {todo.title}
              </Typography>
            </div>
            <Typography style={{marginLeft: 370, color: '#2944cc'}}>
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
                  marginLeft: 40,
                  color: '#2944cc'}} 
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
    setSelectedTags(e.target.value);
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
        handleTagFilterChange={handleTagFilterChange}
         />
    </div>
  );
}

export default App;


