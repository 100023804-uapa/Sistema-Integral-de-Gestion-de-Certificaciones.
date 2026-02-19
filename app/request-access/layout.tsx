import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitar Acceso - SIGCE',
  description: 'Formulario de solicitud de acceso administrativo para el sistema SIGCE.',
};

export default function RequestAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
