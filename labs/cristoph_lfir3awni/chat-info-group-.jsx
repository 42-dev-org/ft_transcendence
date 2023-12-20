import React, { useState } from 'react';

export function App(props) {
  const [mod, setMod] = useState(false)
  const [name, setName] = useState("Start editing to see some magic happen!")
  return (
    <div className='App'>
      {
        mod ? <input value={name} onChange={e => setName(e.target.value)}/> : <h2>{name}</h2>
      }
      <button onClick={() => setMod(prev => !prev)}>{mod ? 'save' : 'edit'}</button>
    </div>
  );
}


// Log to console
console.log('Hello console')
