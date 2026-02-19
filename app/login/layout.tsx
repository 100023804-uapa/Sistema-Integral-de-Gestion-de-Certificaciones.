import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceso - SIGCE',
  description: 'Inicia sesión en el Sistema Integral de Gestión de Certificaciones.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
