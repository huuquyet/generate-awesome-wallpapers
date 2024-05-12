import { Buffer } from 'node:buffer'
import { writeFileSync } from 'node:fs'
import { env } from 'node:process'

const API_TOKEN = env.HF_API_TOKEN

async function query(data: object) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: 'POST',
      body: JSON.stringify(data),
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  // Return arrayBuffer of blob
  const result = await response.arrayBuffer()
  return result
}

query({
  inputs: 'A pristine, turquoise glacier lake nestled among towering alpine peaks',
}).then(async (response) => {
  const destinationPath = './assets/wallpaper.jpg'
  // create buffer from response
  const buffer = Buffer.from(response)
  // Save image to a local file
  await writeFileSync(destinationPath, buffer)
  console.log(`Image saved to ${destinationPath}`)
})
