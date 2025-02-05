'use client'
import { learner_notes } from '@/types/supabaseTypes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function NotesDropdown({ notes }: { notes: learner_notes[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
      >
        {isOpen ? 'Hide Notes' : 'Show Notes'}
        <ChevronDownIcon className={`dropdown-icon ${isOpen ? 'dropdown-icon-open' : ''}`} />

      </button>
      
      {isOpen && (
        <div>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <p>Date: {new Date(note.created_at).toLocaleDateString()}</p>
                <p>{note.note_content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 