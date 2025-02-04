'use client'
import { learner_notes } from '@/types/supabaseTypes';
import { useState } from 'react';

export default function NotesDropdown({ notes }: { notes: learner_notes[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Notes' : 'Show Notes'}
      </button>
      
      {isOpen && (
        <div>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <p>Date: {note.created_at}</p>
                <p>{note.note_content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 