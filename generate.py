import requests
from os import getenv
import json
import random

API_TOKEN = getenv("HF_API_TOKEN")
models = [
    "runwayml/stable-diffusion-v1-5",
    "CompVis/stable-diffusion-v1-4",
    "stabilityai/stable-diffusion-xl-base-1.0",
    "stabilityai/stable-diffusion-2-1",
    "prompthero/openjourney",
    "prompthero/openjourney-v4",
]

random_model = random.choice(models)
API_URL = f"https://api-inference.huggingface.co/models/{random_model}"
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
print(f"Model: {random_model}; prompt: {random_index['inputs']}")

# Generate wallpaper by random prompt
data = query(random_index)
