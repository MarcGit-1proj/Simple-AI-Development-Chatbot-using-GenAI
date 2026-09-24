import os
from dotenv import load_dotenv
from google import genai
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Explicit nating kunin ang API key mula sa environment
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    try:
        data = request.json
        user_prompt = data.get('prompt')
        
        if not user_prompt:
            return jsonify({"error": "Walang napasok na prompt."}), 400

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=user_prompt,
        )

        return jsonify({"response": response.text})
    
    except Exception as e:
        print("CRITICAL ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Flask AI Backend is running and connected!"

if __name__ == "__main__":
    app.run(debug=True, port=5000)