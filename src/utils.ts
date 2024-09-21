import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { default as prompts } from '../assets/prompts.json'

// The list of text-to-image models that support inference API
const MODELS: string[] = [
  'black-forest-labs/FLUX.1-dev',
  'latent-consistency/lcm-lora-sdxl',
  'stabilityai/stable-diffusion-3-medium-diffusers',
  'digiplay/insaneRealistic_v1',
  'dreamlike-art/dreamlike-photoreal-2.0',
  'Yntec/ICantBelieveItSNotPhotography',
]

// The patterns to set the caption of image
const START_CAPTION: string = '<!-- START_CAPTION -->'
const END_CAPTION: string = '<!-- END_CAPTION -->'

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
  return getRandomElement(prompts)
}

/** Update ReadMe file caption of image with model_id and prompt */
export async function updateReadme(model_id: string, prompt: string) {
  try {
    const fileName = resolve('./README.md')
    const contents = await readFile(fileName, { encoding: 'utf8' })
    const regex = new RegExp(`(${START_CAPTION})[\\s\\S]*?(${END_CAPTION})`, '')

    if (!regex.test(contents)) {
      throw new Error('Please add comment blocks in README.md file and try again ⚠️')
    }

    const result = String.raw`*${prompt}* by [${model_id}](https://hf.co/${model_id})`

    const newContents = contents.replace(regex, `$1\n${result}\n$2`)
    await writeFile(fileName, newContents)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
