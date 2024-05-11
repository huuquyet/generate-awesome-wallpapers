from os import getenv
import requests

API_TOKEN = getenv("HF_API_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        with open("wallpaper.png", "wb") as f:
            f.write(response.content)

data = query({        
  "inputs": "A luminous field of fireflies blinking rhythmically against the deep velvet of a summer night",
})
