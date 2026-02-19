export type CertificateStatus = 'active' | 'revoked' | 'expired';
export type CertificateType = 'CAP' | 'PROFUNDO';

export interface Certificate {
  id: string; // UUID interno
  folio: string; // Código único visible (e.g., sigce-2026-CAP-0001)
  studentId: string; // Relación con Student
  studentName: string; // Desnormalizado para consultas rápidas
  type: CertificateType;
  academicProgram: string; // Nombre del curso/diplomado
  issueDate: Date;
  expirationDate?: Date; // Opcional
  status: CertificateStatus;
  qrCodeUrl: string; // URL pública de validación
  pdfUrl?: string; // URL del archivo en Storage
  metadata: Record<string, any>; // Para datos extra flexibles
  createdAt: Date;
  updatedAt: Date;
  history?: CertificateHistoryItem[];
}

export interface CertificateHistoryItem {
  date: Date;
  action: string; // 'created', 'updated', 'printed', 'delivered', 'revoked'
  performedBy: string; // User ID or Name
  details?: string;
}

export type CreateCertificateDTO = Omit<Certificate, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeUrl' | 'pdfUrl'>;
