'use client'

import { useState, FormEvent } from "react";

interface AgentChunk {
    step: string;
    content: any;
}

const ChatComponent = () => {
    const [query, setQuery] = useState<string>("");
    const [finalResponse, setFinalResponse] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setFinalResponse("");

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!response.body) {
                throw new Error("The response body is empty.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunkText = decoder.decode(value);
                const eventLines = chunkText.split("\n\n").filter(Boolean);

                for (const line of eventLines) {
                    if (line.startsWith("data:")) {
                        const jsonString = line.substring(5);
                        try {
                            const { token } = JSON.parse(jsonString);
                            if (token) {
                                setFinalResponse((prev) => prev + token);
                            }
                        } catch (error) {
                            console.error("Failed to parse chunk:", jsonString, error);
                        }
                    }
                }
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching stream:", error);
            setFinalResponse("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', whiteSpace: 'pre-wrap' }}>
                {finalResponse || "Agent's response will appear here..."}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ask the agent..."
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Streaming..." : "Send"}
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;