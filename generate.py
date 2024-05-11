import requests
from os import getenv
import json
import random

API_TOKEN = getenv("HF_API_TOKEN")
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        with open("wallpaper.png", "wb") as f:
            f.write(response.content)

# Load prompt list
with open("prompts.json") as fp:
  prompts = json.load(fp)

# Get random index
random_index = random.choice(prompts)
print(random_index["inputs"])

# Generate wallpaper by random prompt
data = query(random_index)
