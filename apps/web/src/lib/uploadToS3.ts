export const uploadToS3 = async (file: File) => {
  if (!file) return;

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    if (!response.ok) throw new Error("Failed to get signed URL.");

    const { signedUrl, key, signedViewUrl } = await response.json();

    if (!signedUrl || !key) {
      throw new Error("Failed to get signed URL or key.");
    }
   
    console.log(`Got signed url: ${signedUrl}`);
    
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    console.log("S3 Response Status:", uploadResponse.status);
    const responseText = await uploadResponse.text();
    console.log("S3 Response Body:", responseText);

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to S3. Check the response body above.");
    }

    console.log("File uploaded successfully!");
    return signedViewUrl;
  } catch (error) {
    console.error(error);
    alert("Upload failed. Please try again.");
  }
};