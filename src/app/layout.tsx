import '@/styles/themes/lara/lara-dark/styles/theme.css';
import '../styles/styles.css';

import { PrimeReactProvider } from 'primereact/api';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
