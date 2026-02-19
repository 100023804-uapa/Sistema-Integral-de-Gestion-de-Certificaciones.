import { Student, CreateStudentDTO } from '../entities/Student';

export interface IStudentRepository {
    findById(id: string): Promise<Student | null>;
    create(student: CreateStudentDTO): Promise<Student>;
    update(id: string, data: Partial<Student>): Promise<void>;
    list(limit?: number): Promise<Student[]>;
}
