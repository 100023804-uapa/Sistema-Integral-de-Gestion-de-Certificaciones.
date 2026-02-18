export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentId: string; // Matrícula
  certificates: string[]; // IDs of certificates
}
