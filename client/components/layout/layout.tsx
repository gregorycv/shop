import { ReactNode } from 'react';
import { Navbar } from 'components';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <div className='layout'>
    <Navbar />
    {children}
  </div>
);
