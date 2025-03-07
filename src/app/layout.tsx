'use client';
import AppHeader from "@/app/components/app.header";
import AppFooter from "@/app/components/app.footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <Container>
          {children}
        </Container>
        <AppFooter />
      </body>
    </html>
  );
}
