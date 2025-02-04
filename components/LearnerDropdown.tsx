'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { student } from '@/types/supabaseTypes';



export default function LearnersDropdown ({ learners }:{learners: student []})  {
  const [showLearners, setShowLearners] = useState(false);

  return (
    <div>
      <h2>
        <button onClick={() => setShowLearners(!showLearners)}>
          {showLearners ? 'Hide Learners' : 'Show Learners'}
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

