'use client'
import { useState } from 'react';
import Link from 'next/link';
import { quiz_recourse } from '@/types/supabaseTypes';

type ResourcesDropdownProps = {
    resources: quiz_recourse[];
}

export default function ResourcesDropdown({ resources }: ResourcesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Hide Resources' : 'Show Resources'}
            </button>

            {isOpen && resources.length > 0 && (
                <ul>
                    {resources.map(resource => (
                        <li key={resource.id}>
                            <Link href={resource.recourse_link}>
                                {resource.recourse_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
} 