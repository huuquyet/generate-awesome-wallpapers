import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { default as prompts } from '../assets/prompts.json'

// The list of text-to-image models that support inference API
const MODELS: string[] = [
  'runwayml/stable-diffusion-v1-5',
  'CompVis/stable-diffusion-v1-4',
  'stabilityai/stable-diffusion-xl-base-1.0',
  'stabilityai/stable-diffusion-2-1',
  'prompthero/openjourney',
  'prompthero/openjourney-v4',
]

// The patterns to set the caption of image
const START_CAPTION = '<!-- START_CAPTION -->'
const END_CAPTION = '<!-- END_CAPTION -->'

/** Get random element of any array and type safe */
function getRandomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

/** Get random model id from the list */
export function getRandomModel(): string {
  return getRandomElement(MODELS)
}

/** Get random prompt from json file */
export function getRandomPrompt(): string {
  const prompt: string = getRandomElement(prompts)
  return prompt
}

/** Update ReadMe file caption of image with model_id and prompt */
export async function updateReadme(model_id: string, prompt: string) {
  try {
    const filePath = resolve('./README.md')
    const contents = await readFile(filePath, { encoding: 'utf8' })
    const indexStart = contents.indexOf(START_CAPTION)
    const indexEnd = contents.indexOf(END_CAPTION)

    if (indexStart > 0 && indexEnd > indexStart) {
      const firstRemains = contents.substring(0, indexStart).concat(START_CAPTION)
      const lastRemains = contents.substring(indexEnd)
      const model_url = String.raw`https://hf.co/${model_id}`
      const result = `${firstRemains}\n\n  \*${prompt}\*\n  by \[${model_id}\]\(${model_url}\)\n\n${lastRemains}`
      await writeFile(filePath, result)
    } else {
      throw new Error('Please add comment blocks in Readme file to update')
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
