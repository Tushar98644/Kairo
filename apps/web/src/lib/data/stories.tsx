import { auth } from "@clerk/nextjs/server";
import { Story } from "@/lib/types"; 

export async function getStoriesForUser(): Promise<Story[] | null> {
  const { getToken } = auth();
  const token = await getToken();

  if (!token) {
    console.error("No auth token found.");
    return null;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const response = await fetch(`${apiUrl}/api/stories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.statusText}`);
    }

    const stories = await response.json();
    return stories;
  } catch (error) {
    console.error("Error in getStoriesForUser:", error);
    return null;
  }
}