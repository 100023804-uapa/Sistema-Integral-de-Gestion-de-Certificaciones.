import { CertificateType } from '../../domain/entities/Certificate';
import { ICertificateRepository } from '../../domain/repositories/CertificateRepository';

export class GenerateFolio {
    constructor(private certificateRepository: ICertificateRepository) { }

    async execute(type: CertificateType): Promise<string> {
        const year = new Date().getFullYear();
        const prefix = 'sigce';

        // Obtener el conteo actual para este año y tipo para calcular la secuencia
        // Nota: Esto es una simplificación. En producción idealmente se usaría un contador atómico en DB.
        const currentCount = await this.certificateRepository.countByYearAndType(year, type);
        const nextSequence = currentCount + 1;

        // Formatear secuencia a 4 dígitos (0001, 0002, etc.)
        const sequenceStr = nextSequence.toString().padStart(4, '0');

        // Formato: sigce-2026-CAP-0001
        return `${prefix}-${year}-${type}-${sequenceStr}`;
    }
}
