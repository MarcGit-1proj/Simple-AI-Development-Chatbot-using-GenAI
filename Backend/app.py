import os
from dotenv import load_dotenv
from google import genai
from flask import Flask, request, jsonify

load_dotenv()

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    data = request.json
    user_prompt = data.get('prompt')
    
    # Itinuwid ang f-string para walang error
    return jsonify({"response": f"Echo: {user_prompt}"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)

    load_dotenv()

def run_ai():
    # Paggawa ng koneksyon sa client
    client = genai.Client()
    
    prompt = input ("Hi, marc im your created AI Chatbot search here...") 
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