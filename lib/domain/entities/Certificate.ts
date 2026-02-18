export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: Date;
  expirationDate?: Date;
  qrCodeUrl: string;
  pdfUrl: string;
  status: 'issued' | 'pending' | 'revoked';
  type: 'diploma' | 'course' | 'workshop';
}
