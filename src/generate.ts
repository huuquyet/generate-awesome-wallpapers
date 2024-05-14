import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import { env } from 'node:process'
import * as core from '@actions/core'
import { getRandomModel, getRandomPrompt, updateReadme } from './utils'

// Envinroment secrets get from https://huggingface.co/settings/tokens
const API_TOKEN = env.HF_API_TOKEN

/** Fetch text-to-image models with inference api */
async function query(data: any, model_id: string) {
  const API_URL = `https://api-inference.huggingface.co/models/${model_id}`

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
    const model_id = getRandomModel()
    const prompt = getRandomPrompt()
    console.log(`Model: ${model_id}; prompt: ${prompt}`)

    query(
      {
        inputs: prompt,
        options: {
          wait_for_model: true, // If the model is not ready, wait for it instead of receiving 503
        },
      },
      model_id
    ).then(async (response) => {
      const destinationPath = './assets/wallpaper.jpg'
      // create buffer from response
      const buffer = Buffer.from(response)
      // Save image to a local file
      await writeFile(destinationPath, buffer)
      core.debug(`Image saved to ${destinationPath}`)

      // Set outputs for other workflow steps to use
      core.setOutput('model_id', model_id)
      core.setOutput('prompt', prompt)
      updateReadme(model_id, prompt)
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
