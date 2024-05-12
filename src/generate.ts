import { Buffer } from 'node:buffer'
import { writeFileSync } from 'node:fs'
import { env } from 'node:process'
import * as core from '@actions/core'
import { default as prompts } from '../assets/prompts.json'

// Envinroment secrets get from https://huggingface.co/settings/tokens
const API_TOKEN = env.HF_API_TOKEN
// The list of text-to-image models that support inference API
const models: string[] = [
  'runwayml/stable-diffusion-v1-5',
  'CompVis/stable-diffusion-v1-4',
  'stabilityai/stable-diffusion-xl-base-1.0',
  'stabilityai/stable-diffusion-2-1',
  'prompthero/openjourney',
  'prompthero/openjourney-v4',
]

/** Get random element of any array and type safe */
function getRandomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

/** Fetch text-to-image models with inference api */
async function query(data: { inputs: string }) {
  const model_id = getRandomElement(models)
  const API_URL = `https://api-inference.huggingface.co/models/${model_id}`
  console.log(`Model: ${model_id}; prompt: ${data.inputs}`)

  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  // Return arrayBuffer of blob
  const result = await response.arrayBuffer()
  return result
}

/** Get random prompt and query the inference api, then save the image */
export async function run(): Promise<void> {
  try {
    // Log the current timestamp
    core.debug(new Date().toTimeString())
    // Get random prompt from json file
    const data: any = getRandomElement(prompts)

    query(data).then(async (response) => {
      const destinationPath = './assets/wallpaper.jpg'
      // create buffer from response
      const buffer = Buffer.from(response)
      // Save image to a local file
      await writeFileSync(destinationPath, buffer)
      core.debug(`Image saved to ${destinationPath}`)
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
