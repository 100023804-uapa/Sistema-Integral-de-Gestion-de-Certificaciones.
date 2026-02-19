import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro Admin | SIGCE',
  description: 'Completa tu registro administrativo en SIGCE.',
};

export default function RegisterAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
