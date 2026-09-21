import os
from dotenv import load_dotenv
from google import genai

# Babasahin nito ang .env file para makuha ang API key
load_dotenv()

def run_ai():
    # Paggawa ng koneksyon sa client
    client = genai.Client()
    
    prompt = input ("Search here...") 
    print(f"Prompt: {prompt}\n")
    print("loading...")

    # Pagpapadala ng prompt sa Gemini model
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    print("\nAnswer")
    print(response.text)

if __name__ == "__main__":
    run_ai()