import React from 'react';
import CSS from './App.css';
const NoteCard = ({ children }) => (
    <div className="taskCard">
        <div>{children}</div>
          <br/>
    </div>

);

export default NoteCard;
