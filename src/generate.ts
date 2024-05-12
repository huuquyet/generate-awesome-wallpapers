import { Buffer } from 'node:buffer'
import { writeFileSync } from 'node:fs'
import { env } from 'node:process'
import * as core from '@actions/core'

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

export async function run(): Promise<void> {
  try {
    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())

    query({
      inputs: 'A pristine, turquoise glacier lake nestled among towering alpine peaks',
    }).then(async (response) => {
      const destinationPath = './assets/wallpaper.jpg'
      // create buffer from response
      const buffer = Buffer.from(response)
      // Save image to a local file
      await writeFileSync(destinationPath, buffer)
      core.debug(`Image saved to ${destinationPath}`)
    })

    // Set outputs for other workflow steps to use
    core.debug(new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
