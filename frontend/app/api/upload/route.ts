import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth/middleware";

export const POST = requireAdmin(async (request: NextRequest) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        // Validation logic
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Invalid file type. Only JPG, PNG and WebP are allowed." },
                { status: 400 }
            );
        }

        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: "File size too large. Maximum limit is 2MB." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const uniqueFilename = `${crypto.randomUUID()}-${filename}`;
        
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, uniqueFilename);

        await writeFile(filePath, buffer);

        const fileUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({ success: true, url: fileUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
})
