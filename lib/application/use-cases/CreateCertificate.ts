import { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';
import { GenerateFolio } from './GenerateFolio';
import { Certificate, CertificateType, CertificateStatus, CreateCertificateDTO } from '../../domain/entities/Certificate';

export interface CreateCertificateInput {
    studentName: string;
    studentId?: string;
    type: CertificateType;
    academicProgram: string;
    issueDate: Date;
    prefix?: string;
    metadata?: Record<string, any>;
}

export class CreateCertificate {
    constructor(
        private certificateRepository: ICertificateRepository,
        private generateFolio: GenerateFolio
    ) { }

    async execute(input: CreateCertificateInput): Promise<Certificate> {
        // 1. Generar Folio
        const folio = await this.generateFolio.execute(input.type, input.prefix);

        // 2. Preparar datos (DTO)
        const certificateData: CreateCertificateDTO = {
            folio,
            studentName: input.studentName,
            studentId: input.studentId || 'N/A', // Opcional
            type: input.type,
            academicProgram: input.academicProgram,
            issueDate: input.issueDate,
            status: 'active' as CertificateStatus,
            metadata: input.metadata || {},
            // Inicialmente sin URL de QR o PDF, se pueden actualizar después o generar aquí
            // qrCodeUrl: `https://sigce.app/verify/${folio}`, 
        };

        // 3. Guardar en repositorio
        // Nota: El repositorio se encargará de añadir timestamps
        const savedCertificate = await this.certificateRepository.save(certificateData);

        return savedCertificate;
    }
}
