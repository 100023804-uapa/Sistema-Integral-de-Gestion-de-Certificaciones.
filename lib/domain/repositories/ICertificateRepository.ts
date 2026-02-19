import { Certificate, CertificateType, CreateCertificateDTO } from '../entities/Certificate';

export interface ICertificateRepository {
    save(certificate: CreateCertificateDTO): Promise<Certificate>;
    findById(id: string): Promise<Certificate | null>;
    findByFolio(folio: string): Promise<Certificate | null>;
    countByYearAndType(year: number, type: CertificateType): Promise<number>;
    list(limit?: number): Promise<Certificate[]>;
    findByStudentId(studentId: string): Promise<Certificate[]>;
}
