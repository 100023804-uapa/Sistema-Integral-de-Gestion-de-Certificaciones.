
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function seedDatabase() {
    console.log("Seeding database...");

    try {
        const certificatesRef = collection(db, "certificates");
        const programsRef = collection(db, "programs");

        // Add mock certificates
        await addDoc(certificatesRef, {
            folio: "UAPA-TEST-001",
            status: "active",
            createdAt: Timestamp.now(),
            studentName: "Juan Perez",
            academicProgram: "Ingeniería de Software"
        });

        await addDoc(certificatesRef, {
            folio: "UAPA-TEST-002",
            status: "active",
            createdAt: Timestamp.now(),
            studentName: "Maria Garcia",
            academicProgram: "Derecho"
        });

        // Add mock programs
        await addDoc(programsRef, {
            name: "Ingeniería de Software",
            active: true
        });

        await addDoc(programsRef, {
            name: "Derecho",
            active: true
        });

        console.log("Database seeded successfully!");
        alert("Datos de prueba insertados en Firebase!");
    } catch (error) {
        console.error("Error seeding database:", error);
        alert("Error al insertar datos. Revisa la consola.");
    }
}
