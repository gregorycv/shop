import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <ul className='navbar'>
      <li>
        <Link href='/'>
          <a>main</a>
        </Link>
      </li>
      <li>
        <Link href='/products'>
          <a>products</a>
        </Link>
      </li>
      <li>
        <Link href='/about'>
          <a>about</a>
        </Link>
      </li>
    </ul>
  );
};
