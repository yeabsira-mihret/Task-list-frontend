import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Task title must not be empty');
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="New task title..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="border p-2 mr-2 flex-grow rounded"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </div>

      <div className="mb-4 space-x-4">
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />{' '}
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />{' '}
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="pending"
            checked={filter === 'pending'}
            onChange={() => setFilter('pending')}
          />{' '}
          Pending
        </label>
      </div>

      <ul>
        {filteredTasks.length === 0 && <p>No tasks to show.</p>}
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`flex justify-between items-center mb-2 p-2 border rounded ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mr-2"
              />
              {task.title}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 font-bold px-2"
              aria-label="Delete task"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
