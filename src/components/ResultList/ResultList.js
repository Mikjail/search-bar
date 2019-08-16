import React from 'react';

export default function ResultListComponent({ items }) {
  return (
    <ul>
      {items.map((elem, index) => (
        <li key={index}>{elem.Title}</li>
      ))}
    </ul>
  );
}
