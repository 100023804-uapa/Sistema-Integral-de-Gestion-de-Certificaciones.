import jsPDF from 'jspdf';
import { Certificate } from '@/lib/domain/entities/Certificate';
import { CertificateTemplate } from '@/lib/domain/entities/Template';
import QRCode from 'qrcode';

export const generateCertificatePDF = async (certificate: Certificate, template?: CertificateTemplate | null): Promise<Blob> => {
    // 1. Setup Document
    const width = template ? template.width : 297; // A4 Landscape default (mm approx) or px if custom
    const height = template ? template.height : 210;

    // Si la plantilla usa pixeles (ej. 800x600), jsPDF necesita saberlo. 
    // Asumiremos que si width > 500, son pixeles. Si no, mm.
    const unit = width > 500 ? 'px' : 'mm';
    const orientation = width > height ? 'landscape' : 'portrait';

    const doc = new jsPDF({
        orientation,
        unit,
        format: [width, height]
    });

    // 2. Background Image
    if (template?.backgroundImageUrl) {
        try {
            const img = await loadImage(template.backgroundImageUrl);
            doc.addImage(img, 'JPEG', 0, 0, width, height);
        } catch (e) {
            console.error("Error loading background image", e);
        }
    }

    // 3. Render Elements (Template Based)
    if (template && template.elements) {
        for (const el of template.elements) {
            const value = resolveVariable(el.content, certificate);

            if (el.type === 'text' || el.type === 'variable') {
                doc.setFontSize(el.style.fontSize || 12);
                doc.setTextColor(el.style.color || '#000000');
                if (el.style.fontFamily) doc.setFont(el.style.fontFamily); // Standard fonts: helvetica, times, courier

                doc.text(value, el.position.x, el.position.y, {
                    align: el.style.align || 'left',
                    maxWidth: el.style.width
                });
                const qrDataUrl = await QRCode.toDataURL(certificate.qrCodeUrl || `https://sigce.edu.do/verify/${certificate.folio}`);
                const size = el.style.width || 30; // 30 units default
                doc.addImage(qrDataUrl, 'PNG', el.position.x, el.position.y, size, size);
            } else if (el.type === 'image') {
                try {
                    const img = await loadImage(el.content);
                    const w = el.style.width || 40;
                    const h = el.style.height || 40;
                    doc.addImage(img, 'JPEG', el.position.x, el.position.y, w, h);
                } catch (e) {
                    console.error("Error loading template image element", e);
                }
            }
        }
    } else {
        // 4. Fallback Default Layout (If no template selected)
        renderDefaultLayout(doc, certificate, width, height);
    }

    return doc.output('blob');
};

const resolveVariable = (content: string, cert: Certificate): string => {
    // Replace {{variable}} with value
    return content.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        if (key === 'studentName') return cert.studentName;
        if (key === 'folio') return cert.folio;
        if (key === 'academicProgram') return cert.academicProgram;
        if (key === 'issueDate') return new Date(cert.issueDate).toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' });
        return key;
    });
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};

const renderDefaultLayout = async (doc: jsPDF, cert: Certificate, w: number, h: number) => {
    // Simple Classic Design
    // Simple Classic Design
    try {
        const logoUrl = '/logo de la uapa.jpeg';
        const img = await loadImage(logoUrl);
        // Centered logo at top
        const logoWidth = 40;
        const logoHeight = 40; // Assuming square or similar aspect ratio
        const x = (w - logoWidth) / 2;
        doc.addImage(img, 'JPEG', x, 20, logoWidth, logoHeight);
    } catch (e) {
        console.error("Error loading default logo", e);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text("CERTIFICADO DE RECONOCIMIENTO", w / 2, 70, { align: "center" }); // Moved down slightly

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Se otorga el presente a:", w / 2, 90, { align: "center" });

    doc.setFont("times", "bolditalic");
    doc.setFontSize(40);
    doc.text(cert.studentName, w / 2, 100, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text(`Por haber concluido satisfactoriamente el programa:`, w / 2, 120, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(cert.academicProgram, w / 2, 135, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de emisión: ${new Date(cert.issueDate).toLocaleDateString()}`, w / 2, 160, { align: "center" });
    doc.text(`Folio: ${cert.folio}`, w / 2, 166, { align: "center" });

    // QR
    try {
        const qrDataUrl = await QRCode.toDataURL(cert.qrCodeUrl || `https://sigce.edu.do/verify/${cert.folio}`);
        doc.addImage(qrDataUrl, 'PNG', w - 40, h - 40, 30, 30);
    } catch (e) {
        console.error("QR Error", e);
    }
};
