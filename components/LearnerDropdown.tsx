'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { student } from '@/types/supabaseTypes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';



export default function LearnersDropdown ({ learners }:{learners: student []})  {
  const [showLearners, setShowLearners] = useState(false);

  return (
    <div>
      <h2>
        <button onClick={() => setShowLearners(!showLearners)}
                      className="dropdown-button"
          >
          {showLearners ? 'Hide Learners' : 'Show Learners'}
          <ChevronDownIcon className={`dropdown-icon ${showLearners ? 'dropdown-icon-open' : ''}`} />

        </button>
      </h2>
      {showLearners && (
        <div>
          {learners.map((learner) => (
            <div key={learner.id}>
              <Link href={`/student/${learner.id}`}>
                <p>Name: {learner.name}</p>
              </Link>
              <p>Email: {learner.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

