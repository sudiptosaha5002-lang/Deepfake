import asyncio
from backboard import BackboardClient

async def main():
    api_key = "espr_wlDf8qpEIX5IJJk2KHHmnZvAhiQR3qVYaAQLxhvbgVA"
    try:
        # Initialize the client with the new API key
        client = BackboardClient(api_key=api_key)

        print("Testing Backboard SDK with the provided API key...")
        response = await client.send_message(
            "Hello! This is a test message to verify the API key."
        )

        print("Success! The API key is working.")
        print("Reply:", response.content)
    except Exception as e:
        print("Failed!")
        print("Error details:", str(e))

asyncio.run(main())
