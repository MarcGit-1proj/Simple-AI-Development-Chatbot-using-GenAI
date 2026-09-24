# 🤖 AI Chatbot Project (Flask + React + Gemini)

A lightweight and interactive AI chatbot application built with a **Python (Flask)** backend and a **React** frontend, powered by the official Google `genai` SDK and secured using `python-dotenv`.

---

## 🚀 Features
* **Interactive Chat Widget:** Floating chat UI built with React components and inline styles.
* **AI-Powered Backend:** Uses the official Google GenAI SDK (`app.py`) to process user prompts seamlessly.
* **Secure Configuration:** Environment variables managed safely via `python-dotenv`.

---

## ⚠️ API Usage Notice
Please note that this application utilizes the official Gemini API, which has a specific request limit based on your quota tier. 
* If you exceed the maximum number of allowed requests, the chatbot may temporarily stop responding. 
* In such cases, please wait for the quota to reset after **24 hours** before trying again.

---

## 🛠️ Project Structure
```text
└── Backend/
    └── app.py
└── Frontend/
    └── Artificial intelligence/
        └── src/
            ├── App.jsx
            └── components/
                └── chat.jsx
