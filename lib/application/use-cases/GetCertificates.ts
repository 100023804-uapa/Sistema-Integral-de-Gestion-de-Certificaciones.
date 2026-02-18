import { Certificate } from '../../domain/entities/Certificate';
import { CertificateRepository } from '../../domain/repositories/CertificateRepository';

export class GetCertificates {
  constructor(private certificateRepository: CertificateRepository) {}

  async execute(): Promise<Certificate[]> {
    return this.certificateRepository.findAll();
  }
}
