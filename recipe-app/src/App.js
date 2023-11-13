import React from 'react';
import Button from './components/common/Button.jsx';
import SearchBar from './components/common/Searchbar.jsx';
import Table from './components/common/Table.jsx';
import Recipes from './components/pages/ Recipes.jsx'
const data = [
  { id: 1, name: 'Spaghetti Carbonara', description: 'A classic Italian dish', cookingTime: 30 },
  { id: 2, name: 'Margherita Pizza', description: 'Simple yet delicious', cookingTime: 50 },
]
const columns = [
  { header: 'Name', cell: (row) => row.name },
  { header: 'Description', cell: (row) => row.description },
  { header: 'Cooking Time', cell: (row) => `${row.cookingTime} mins` },
];

function App() {
  return (
    <div>
      <h1>Recipe App</h1>
      <Recipes />
    </div>
  );
}

export default App;
