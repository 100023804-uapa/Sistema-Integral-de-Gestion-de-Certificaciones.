import { db } from "@/lib/firebase";
import { collection, getCountFromServer, query, where, Timestamp } from "firebase/firestore";
import { CertificateStatus } from "@/lib/domain/entities/Certificate";

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

            // 2. Pending Validation (Simulated for now, or based on 'pending' status if added)
            // Assuming 'revoked' or a specific flag might count as attention needed, 
            // but for now let's use a placeholder logic or a specific status if we add 'pending' to types.
            // Let's assume we want to count 'expired' as needing attention for now, or add a 'pending' status later.
            // For this MVP, let's query 'revoked' as a proxy for "Attention Needed" or just return 0 if no pending status exists.
            // Actually, let's keep it 0 or mock it until we add a 'pending' verification queue.
            const pendingCount = 0;

            // 3. Active Programs (Distinct programs query is expensive in NoSQL, 
            // usually better to keep a counter in a separate 'stats' document or 'programs' collection)
            // For MVP, we will fetch a separate 'programs' collection count if it existed.
            // Let's mock this part or assumes a 'programs' collection exists.
            const programsRef = collection(db, "programs");
            const programsSnapshot = await getCountFromServer(programsRef);

            return {
                totalIssued: issuedSnapshot.data().count,
                pendingValidation: pendingCount,
                activePrograms: programsSnapshot.data().count || 0,
                recentActivity: [], // We would query a 'logs' collection here
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
