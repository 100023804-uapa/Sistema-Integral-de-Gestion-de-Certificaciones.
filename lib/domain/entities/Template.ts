export type TemplateElementType = 'text' | 'variable' | 'qr' | 'image';

export interface TemplateElement {
    id: string;
    type: TemplateElementType;
    content: string; // Used for static text or variable name (e.g., "studentName")
    position: { x: number; y: number };
    style: {
        fontSize?: number;
        fontFamily?: string;
        color?: string;
        align?: 'left' | 'center' | 'right';
        width?: number;
        height?: number;
        opacity?: number;
    };
}

export interface CertificateTemplate {
    id: string;
    name: string;
    backgroundImageUrl: string; // URL from Firebase Storage
    width: number; // Viewport width for relative positioning (e.g., 800)
    height: number; // Viewport height (e.g., 600)
    elements: TemplateElement[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface CreateTemplateDTO {
    name: string;
    backgroundImageUrl: string;
    width: number;
    height: number;
    elements: TemplateElement[];
}

export type UpdateTemplateDTO = Partial<CreateTemplateDTO> & { isActive?: boolean };
