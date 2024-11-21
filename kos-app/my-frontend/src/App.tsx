import React from 'react';
import KamarTable from './components/KamarTable'; // Mengimpor komponen KamarTable
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Daftar Kamar</h1>
      </header>
      {/* Menampilkan komponen KamarTable */}
      <KamarTable />
    </div>
  );
}

export default App;
