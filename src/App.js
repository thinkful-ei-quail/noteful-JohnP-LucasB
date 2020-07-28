import React from 'react';

import './App.css';

function App() {
  return (
    <main>
      <header>
        <h1>noteful.</h1>
      </header>

      <section className="Folder-page">
        <section className="notes-display">

          <div>
            <ul>
              <li>Note 1</li>
              <li>Note 2</li>
              <li>Note 3</li>
              <li>Note 4</li>
              <li>Note 5</li>
              <li>Note 6</li>
            </ul>
          </div>
        </section>

      </section>


      <section className="Main-page">
        <section className="notes-display">

          <div>
            <ul>
              <li>Note 1</li>
              <li>Note 2</li>
              <li>Note 3</li>
              <li>Note 4</li>
              <li>Note 5</li>
              <li>Note 6</li>
            </ul>
          </div>
        </section>

        <hr />
        <section className="sidebar">
          <nav>
            <ul>
              <li>Folder 1</li>
              <li>Folder 2</li>
              <li>Folder 3</li>
              <li>Add Folder</li>
            </ul>
          </nav>
        </section>
      </section>
    </main>
  )
}

export default App;
