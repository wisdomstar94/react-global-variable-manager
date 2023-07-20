import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'react-global-variable-manager test',
  description: 'react-global-variable-manager test',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
