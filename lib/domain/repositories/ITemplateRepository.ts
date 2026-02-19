import { CertificateTemplate, CreateTemplateDTO, UpdateTemplateDTO } from '../entities/Template';

export interface ITemplateRepository {
    save(template: CreateTemplateDTO): Promise<CertificateTemplate>;
    update(id: string, template: UpdateTemplateDTO): Promise<void>;
    findById(id: string): Promise<CertificateTemplate | null>;
    list(activeOnly?: boolean): Promise<CertificateTemplate[]>;
    delete(id: string): Promise<void>;
}
