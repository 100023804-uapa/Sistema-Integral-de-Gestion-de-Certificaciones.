import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, query, where, getCountFromServer, limit, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Certificate, CertificateType, CreateCertificateDTO } from '../../domain/entities/Certificate';
import { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';

const COLLECTION_NAME = 'certificates';

export class FirebaseCertificateRepository implements ICertificateRepository {

    async create(data: CreateCertificateDTO): Promise<Certificate> {
        return this.save(data);
    }

    async save(data: CreateCertificateDTO): Promise<Certificate> {
        const certificateData = {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            // Ensure dates are stored as Timestamps
            issueDate: Timestamp.fromDate(new Date(data.issueDate)),
            expirationDate: data.expirationDate ? Timestamp.fromDate(new Date(data.expirationDate)) : null,
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), certificateData);

        return {
            id: docRef.id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Certificate;
    }

    async findById(id: string): Promise<Certificate | null> {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return this.mapDocToEntity(docSnap);
        } else {
            return null;
        }
    }

    async findByFolio(folio: string): Promise<Certificate | null> {
        const q = query(collection(db, COLLECTION_NAME), where("folio", "==", folio), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        return this.mapDocToEntity(querySnapshot.docs[0]);
    }

    async findByStudentId(studentId: string): Promise<Certificate[]> {
        const q = query(collection(db, COLLECTION_NAME), where("studentId", "==", studentId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => this.mapDocToEntity(doc));
    }

    async countByYearAndType(year: number, type: CertificateType): Promise<number> {
        // This is a simplified count. For production with high volume, consider distributed counters or aggregation queries.
        // Assuming folio structure contains year and type, or we filter by date range.
        // Here we filter by issueDate range for the year AND type field.

        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59);

        const q = query(
            collection(db, COLLECTION_NAME),
            where("type", "==", type),
            where("issueDate", ">=", Timestamp.fromDate(startOfYear)),
            where("issueDate", "<=", Timestamp.fromDate(endOfYear))
        );

        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    }

    async list(limitCount: number = 20): Promise<Certificate[]> {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"), limit(limitCount));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => this.mapDocToEntity(doc));
    }

    async updateStatus(id: string, status: Certificate['status']): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            status,
            updatedAt: Timestamp.now()
        });
    }

    private mapDocToEntity(doc: any): Certificate {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            issueDate: data.issueDate?.toDate(),
            expirationDate: data.expirationDate?.toDate(),
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
        } as Certificate;
    }
}
