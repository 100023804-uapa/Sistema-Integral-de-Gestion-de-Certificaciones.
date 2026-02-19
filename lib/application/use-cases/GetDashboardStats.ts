import { db } from "@/lib/firebase";
import { collection, getCountFromServer, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export interface DashboardStats {
    totalIssued: number;
    pendingValidation: number;
    activePrograms: number;
    recentActivity: Array<{
        id: string;
        type: 'success' | 'warning' | 'info';
        title: string;
        description: string;
        time: string;
    }>;
}

export class GetDashboardStats {
    async execute(): Promise<DashboardStats> {
        try {
            const certificatesRef = collection(db, "certificates");

            // 1. Total Issued (Status: active)
            const issuedQuery = query(certificatesRef, where("status", "==", "active"));
            const issuedSnapshot = await getCountFromServer(issuedQuery);

            // 2. Pending Validation (Placeholder for now)
            const pendingCount = 0;

            // 3. Recent Activity & Active Programs Calculation
            // We fetch the last 50 certificates to:
            // a) Generate recent activity feed
            // b) Estimate active programs count (distinct academicProgram)
            const recentQuery = query(certificatesRef, orderBy("createdAt", "desc"), limit(50));
            const recentDocs = await getDocs(recentQuery);

            const recentActivity = recentDocs.docs.slice(0, 5).map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    type: 'success' as const,
                    title: 'Nuevo Certificado',
                    description: `Emitido a ${data.studentName || 'Estudiante'} - ${data.folio || ''}`,
                    time: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Reciente'
                };
            });

            // Calculate distinct programs from the recent batch (approximation)
            const uniquePrograms = new Set(recentDocs.docs.map(doc => doc.data().academicProgram).filter(Boolean));

            return {
                totalIssued: issuedSnapshot.data().count,
                pendingValidation: pendingCount,
                activePrograms: uniquePrograms.size, // This will now show a real number based on recent data
                recentActivity: recentActivity,
            };
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            // Return zeroed stats on error to not break UI
            return {
                totalIssued: 0,
                pendingValidation: 0,
                activePrograms: 0,
                recentActivity: []
            };
        }
    }
}
