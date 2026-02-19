import { ICertificateRepository } from '../../domain/repositories/CertificateRepository';
import { Certificate } from '../../domain/entities/Certificate';

export class GetCertificates {
  constructor(private certificateRepository: ICertificateRepository) { }

  async execute(): Promise<Certificate[]> {
    return this.certificateRepository.findAll();
  }
}
