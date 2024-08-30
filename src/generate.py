import requests
from os import getenv
import json
import random

# Envinroment secrets get from https://huggingface.co/settings/tokens
API_TOKEN = getenv("HF_API_TOKEN")
# The list of text-to-image models that support inference API
MODELS = [
    'black-forest-labs/FLUX.1-dev',
    'black-forest-labs/FLUX.1-schnell',
    'ByteDance/Hyper-SD',
    'latent-consistency/lcm-lora-sdxl',
    'Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro',
    'stabilityai/stable-diffusion-3-medium-diffusers',
]

random_model = random.choice(MODELS)
API_URL = f"https://api-inference.huggingface.co/models/{random_model}"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query(payload):
    ''' Fetch text-to-image models with inference api '''
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        with open("./assets/wallpaper.jpg", "wb") as f:
            f.write(response.content)

# Load prompt list
with open("./assets/prompts.json") as fp:
  prompts = json.load(fp)

# Get random prompt from list
random_prompt = random.choice(prompts)
print(f"Model: {random_model}; prompt: {random_prompt['inputs']}")

# Generate wallpaper by random prompt
data = query(random_prompt)
