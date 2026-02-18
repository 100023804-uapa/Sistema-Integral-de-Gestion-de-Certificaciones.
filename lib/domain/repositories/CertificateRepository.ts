import { Certificate } from '../entities/Certificate';

export interface CertificateRepository {
  findById(id: string): Promise<Certificate | null>;
  findByStudentId(studentId: string): Promise<Certificate[]>;
  save(certificate: Certificate): Promise<void>;
  findAll(): Promise<Certificate[]>;
}
