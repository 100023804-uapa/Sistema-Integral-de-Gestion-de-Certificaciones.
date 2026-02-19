import { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';
import { Certificate } from '../../domain/entities/Certificate';

export class GetCertificates {
  constructor(private certificateRepository: ICertificateRepository) { }

  async execute(): Promise<Certificate[]> {
    return this.certificateRepository.findAll();
  }
}
