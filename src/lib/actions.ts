"use server"

// import { db } from "@/lib/db";
import sharp from 'sharp';
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "./appwrite.config";
import { ID } from "node-appwrite";
import { db } from './db';
import axios from 'axios'

export const uploadToAppwrite = async (file: File, configId?: string) => {
    try {
        // Create a file on Appwrite storage (this is much simpler than manually doing axios requests)
        const response = await storage.createFile(BUCKET_ID!, ID.unique(), file);
        const fileId = response.$id;
        const fileUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;

        // Extract image metadata (width, height) using sharp
        const imgMetadata = await extractImageMetadata(file);
        const { width, height } = imgMetadata;

        // Store metadata in your database
        const savedConfigId = await storeImageMetadata(fileUrl, width!, height!, configId);

        return { savedConfigId };
    } catch (error: any) {
        console.log(error)
        throw new Error('File upload to Appwrite failed: ', error.message);
    }
};

const extractImageMetadata = async (file: File) => {
    // You can use a library like sharp to extract metadata
    const res = await fetch(URL.createObjectURL(file));
    const buffer = await res.arrayBuffer();

    const imgMetadata = await sharp(buffer).metadata();
    return imgMetadata;
};

const storeImageMetadata = async (imageUrl: string, width: number, height: number, configId?: string) => {
    // Send metadata to your DB (assuming you have a database utility)
    if (!configId) {
        const configuration = await db.configuration.create({
            data: {
                imageUrl,
                height: height || 500,
                width: width || 500,
            },
        })

        return { configId: configuration.id }
    } else {
        const updatedConfiguration = await db.configuration.update({
            where: {
                id: configId,
            },
            data: {
                croppedImageUrl: imageUrl,
            },
        })

        return { configId: updatedConfiguration.id }
    }
};