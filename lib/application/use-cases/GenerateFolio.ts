import { CertificateType } from '../../domain/entities/Certificate';
import { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';

export class GenerateFolio {
    constructor(private certificateRepository: ICertificateRepository) { }

    async execute(type: CertificateType, prefix: string = 'sigce'): Promise<string> {
        const year = new Date().getFullYear();

        // Prefer atomic sequence reservation to avoid collisions under concurrency.
        let nextSequence: number;
        if (typeof this.certificateRepository.reserveNextSequence === 'function') {
            nextSequence = await this.certificateRepository.reserveNextSequence(year, type, prefix);
        } else {
            const currentCount = await this.certificateRepository.countByYearAndType(year, type);
            nextSequence = currentCount + 1;
        }

        const sequenceStr = nextSequence.toString().padStart(4, '0');
        return `${prefix}-${year}-${type}-${sequenceStr}`;
    }
}
