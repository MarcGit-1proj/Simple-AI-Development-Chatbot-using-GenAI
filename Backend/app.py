import os
from dotenv import load_dotenv
from google import genai

# Babasahin nito ang .env file para makuha ang API key
load_dotenv()

def run_ai():

    client = genai.Client()
    
    prompt = input ("Hi, marc im your created AI Chatbot search here...") 
    print(f"Prompt: {prompt}\n")
    print("loading...")

   
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    print("\nAnswer")
    print(response.text)

if __name__ == "__main__":
    run_ai()