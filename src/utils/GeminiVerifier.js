// Modul provider AI
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Modul untuk mendapatkan direktori sementara
import fs from "fs";
import path from "path";
import os from "os";

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.NEXT_GEMINI_API_KEY);

export const verifyImageWithGoogleAI = async (imageFile) => {
  try {
    // Gunakan direktori sementara sistem
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `${Date.now()}-${imageFile.name}`);

    // Tulis file sementara di direktori yang valid
    fs.writeFileSync(tempFilePath, Buffer.from(await imageFile.arrayBuffer()));

    // Upload file dari path
    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: imageFile.type,
      displayName: imageFile.name,
    });

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: "Analyze the image and determine whether it shows a person (preferably a student in uniform) engaged in cleaning activities within a school environment. Valid cleaning activities include disposing of trash, sweeping, or other environmental cleaning actions within the school or classroom. If the image clearly shows such actions, return 'true' If not, return 'false' Only provide a 'true' or 'false' response.",
      },
    ]);

    // Hapus file sementara
    fs.unlinkSync(tempFilePath);

    // Parsing hasil AI
    const aiResponse = result.response.text();
    console.log("AI Response: ", aiResponse);

    const isVerified = aiResponse.trim().toLowerCase() === "true";
    return isVerified;
  } catch (error) {
    console.error("Error during image verification: ", error);
    throw error;
  }
};
