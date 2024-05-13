# Generate awesome wallpapers with javascript action

This action generate awesome wallpapers using HuggingFace Inference API (serverless) to call text-to-image models

**🖼️ This awesome wallpaper generated automatically everyday**
  
![Awesome Wallpapers](./assets/wallpaper.jpg)

<!-- START_CAPTION -->

<!-- END_CAPTION -->

## API Token

### `HF_API_TOKEN`

**Required** Get API Token from [your HuggingFace profile settings](https://huggingface.co/settings/tokens)

Then add to the [secrets for the repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

## List of models

- [runwayml/stable-diffusion-v1-5](https://hf.co/runwayml/stable-diffusion-v1-5)
- [CompVis/stable-diffusion-v1-4](https://hf.co/CompVis/stable-diffusion-v1-4)
- [stabilityai/stable-diffusion-xl-base-1.0](https://hf.co/stabilityai/stable-diffusion-xl-base-1.0)
- [stabilityai/stable-diffusion-2-1](https://hf.co/stabilityai/stable-diffusion-2-1)
- [prompthero/openjourney](https://hf.co/prompthero/openjourney)
- [prompthero/openjourney-v4](https://hf.co/prompthero/openjourney-v4)

## Outputs

### `model_id`

The random model get from list to generate

### `prompt`

The random prompt get from json file

## Example usage

```yaml
uses: huuquyet/generate-awesome-wallpapers@v1
env: 
    HF_API_TOKEN: ${{ secrets.HF_API_TOKEN }}
```

Please check out [my profile](https://github.com/huuquyet) for live demo
