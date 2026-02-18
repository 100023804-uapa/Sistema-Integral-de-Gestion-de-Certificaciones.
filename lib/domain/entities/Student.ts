export interface Student {
  id: string; // Matrícula o Cédula (Identificador único)
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  career?: string; // Carrera o Departamento
  createdAt: Date;
  updatedAt: Date;
}

export type CreateStudentDTO = Omit<Student, 'id' | 'createdAt' | 'updatedAt'> & { id: string };
