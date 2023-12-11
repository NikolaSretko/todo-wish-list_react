import React, { useState, useEffect } from 'react';

const TodoList = () => {
  // Zustand für die Wünsche
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState('');
  const [priority, setPriority] = useState(''); 

  // useEffect Hook für die Speicherung im LocalStorage
  useEffect(() => {
    const storedWishes = JSON.parse(localStorage.getItem('wishes'));
    if (storedWishes) {
      setWishes(storedWishes);
    }
  }, []);

  useEffect(() => {
    // Speichere Wünsche im LocalStorage, wenn sich der Zustand ändert
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  // Funktion zum Hinzufügen eines neuen Wunsches
  const addWish = () => {
    if (newWish.trim() !== '' && priority !== '') {
      setWishes([...wishes, { text: newWish, completed: false, priority }]);
      setNewWish('');
      setPriority(''); // Zurücksetzen der Priorität nach dem Hinzufügen
    }
  };

  // Funktion zum Markieren eines Wunsches als erledigt
  const markCompleted = (index) => {
    const updatedWishes = [...wishes];
    updatedWishes[index].completed = !updatedWishes[index].completed;
    setWishes(updatedWishes);
  };

  // Funktion zum Löschen eines Wunsches
  const deleteWish = (index) => {
    const updatedWishes = wishes.filter((_, i) => i !== index);
    setWishes(updatedWishes);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-8 border rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">ToDo/WishList</h1>
        <input
          type="text"
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addWish()} // Hinzufügen beim Drücken der Enter-Taste
          placeholder="Neuer Wunsch eingeben"
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="flex mb-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="" disabled selected>
              Wähle die Priorität
            </option>
            <option value="not-important">Nicht so wichtig</option>
            <option value="important">Wichtig</option>
            <option value="very-important">Sehr wichtig</option>
          </select>
        </div>
        <button
          onClick={addWish}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Hinzufügen
        </button>
        <ul className="mt-4">
          {wishes.map((wish, index) => (
            <li key={index} className={`flex items-center justify-between ${wish.completed ? 'completed' : ''}`}>
              <span
                className={`text-green cursor-pointer ${wish.completed ? 'line-through' : ''}`}
                onClick={() => markCompleted(index)}
              >
                {wish.completed ? '✔' : '○'} {wish.text}
              </span>
              <div className="flex items-center">
                <button
                  className="justify-start rounded-xl px-2 hover:bg-red-700 hover:text-white transition duration-300 cursor-pointer hover:rounded-xl"
                  onClick={() => deleteWish(index)}
                >
                  Löschen
                </button>
                <span className={`ml-4 ${getPriorityColor(wish.priority)}`}>
                  {getPriorityLabel(wish.priority)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

// Hilfsfunktionen für Prioritäten
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'important':
      return 'text-yellow-500';
    case 'very-important':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'important':
      return 'Wichtig';
    case 'very-important':
      return 'Sehr wichtig';
    default:
      return 'Nicht so wichtig';
  }
};
