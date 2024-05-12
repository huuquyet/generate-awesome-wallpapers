# Generate awesome wallpapers with javascript action

This action generate awesome wallpapers using HuggingFace Inference API (serverless) to call text-to-image models

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

## Example usage

```yaml
uses: huuquyet/generate-awesome-wallpapers@v0.1
env: 
    HF_API_TOKEN: ${{ secrets.HF_API_TOKEN }}
```
