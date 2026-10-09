import asyncio
from backboard import BackboardClient

async def main():
    api_key = "espr_wlDf8qpEIX5IJJk2KHHmnZvAhiQR3qVYaAQLxhvbgVA"
    client = BackboardClient(api_key=api_key)

    print("Initializing Text Analysis via Backboard Memory & RAG...")
    
    # Example Text to Analyze
    source_text = (
        "The Ecodesign for Sustainable Products Regulation (ESPR) is a framework "
        "by the European Union to improve the circularity, energy performance, "
        "and environmental sustainability of products on the EU market."
    )

    try:
        # Step 1: Store the text in Backboard's persistent memory/RAG system
        print("1. Storing text in memory...")
        store_response = await client.send_message(
            f"Please remember this text for analysis: {source_text}",
            assistant_id="text-analyzer-bot",
            memory="Auto" # This triggers the Memory & RAG feature
        )
        print("Stored successfully!")

        # Step 2: Query the RAG system to analyze the text
        print("2. Analyzing the text from memory...")
        analysis_response = await client.send_message(
            "Based on the text I just gave you, what is the main goal of the ESPR?",
            assistant_id="text-analyzer-bot",
            memory="Auto"
        )
        
        print("\n--- Analysis Result ---")
        print(analysis_response.content)
        
    except Exception as e:
        print("\nError during text analysis:")
        print(str(e))
        print("\nNote: Since your account is on the free tier, you may only be able to ingest data into RAG/Memory, but generation (chatting) might still require billing credits!")

if __name__ == "__main__":
    asyncio.run(main())
