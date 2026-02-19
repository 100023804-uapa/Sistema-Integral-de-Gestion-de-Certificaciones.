import { Certificate, CreateCertificateDTO } from '../entities/Certificate';
import { Student, CreateStudentDTO } from '../entities/Student';

export interface IStudentRepository {
  findById(id: string): Promise<Student | null>;
  create(student: CreateStudentDTO): Promise<Student>;
  update(id: string, data: Partial<Student>): Promise<Student>;
}

export interface ICertificateRepository {
  findByFolio(folio: string): Promise<Certificate | null>;
  findByStudentId(studentId: string): Promise<Certificate[]>;
  create(certificate: CreateCertificateDTO): Promise<Certificate>;
  updateStatus(id: string, status: Certificate['status']): Promise<void>;
  countByYearAndType(year: number, type: string): Promise<number>; // Para generar secuencia de folio
  findAll(): Promise<Certificate[]>;
}
