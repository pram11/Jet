import React, { useState, useEffect } from 'react';
import './list.css';
const List: React.FC = () => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const newList = ['foo', 'bar'];
    setList(newList);
  }, []);

  return (
    <div>
      <h1>List</h1>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
