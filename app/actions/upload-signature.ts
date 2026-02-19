'use server';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase"; // Ensure this initializes app properly on server

// ... imports

export async function uploadImageAction(formData: FormData, folder: string = 'uploads') {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file provided');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const storage = getStorage(app);
    // Explicitly check bucket config
    console.log("Storage Bucket:", app.options.storageBucket);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storageRef = ref(storage, `${folder}/${timestamp}_${safeName}`);

    // Add metadata for basic content type handling
    const metadata = {
        contentType: file.type || 'image/png',
    };

    try {
        await uploadBytes(storageRef, buffer, metadata);
        const downloadUrl = await getDownloadURL(storageRef);
        return { success: true, url: downloadUrl };
    } catch (error: any) {
        console.error("Server upload error detailed:", {
            code: error.code,
            message: error.message,
            serverResponse: error.serverResponse,
            customData: error.customData
        });
        return { success: false, error: `Upload failed: ${error.message} (${error.code})` };
    }
}
