import { Certificate } from '../../domain/entities/Certificate';
import { CertificateRepository } from '../../domain/repositories/CertificateRepository';

export class MockCertificateRepository implements CertificateRepository {
  private certificates: Certificate[] = [
    {
      id: 'SIGCE-2023-8492',
      studentId: '2021-0458',
      studentName: 'Juan Pérez Rodríguez',
      courseName: 'Diplomado en Ciberseguridad y Hacking Ético',
      issueDate: new Date('2023-10-15'),
      qrCodeUrl: '/mock-qr.png',
      pdfUrl: '/mock-certificate.pdf',
      status: 'issued',
      type: 'diploma',
    },
    {
      id: 'SIGCE-2023-1102',
      studentId: '2022-1102',
      studentName: 'Carlos Jiménez',
      courseName: 'Criminología Educativa y Prevención Escolar',
      issueDate: new Date('2023-10-08'),
      qrCodeUrl: '/mock-qr-2.png',
      pdfUrl: '/mock-certificate-2.pdf',
      status: 'issued',
      type: 'course',
    },
  ];

  async findById(id: string): Promise<Certificate | null> {
    return this.certificates.find((c) => c.id === id) || null;
  }

  async findByStudentId(studentId: string): Promise<Certificate[]> {
    return this.certificates.filter((c) => c.studentId === studentId);
  }

  async save(certificate: Certificate): Promise<void> {
    const index = this.certificates.findIndex((c) => c.id === certificate.id);
    if (index >= 0) {
      this.certificates[index] = certificate;
    } else {
      this.certificates.push(certificate);
    }
  }

  async findAll(): Promise<Certificate[]> {
    return this.certificates;
  }
}
