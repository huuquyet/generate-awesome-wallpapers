[![Generate awesome wallpapers](https://github.com/huuquyet/generate-awesome-wallpapers/actions/workflows/generate-awesome-wallpapers.yml/badge.svg)](https://github.com/huuquyet/generate-awesome-wallpapers/actions/workflows/generate-awesome-wallpapers.yml) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](.github/code_of_conduct.md)

# Generate awesome wallpapers with javascript action

This action generate awesome wallpapers using HuggingFace Inference API (serverless) to call text-to-image models

**🖼️ This awesome wallpaper generated automatically everyday**

<center>
  <img alt="Awesome Wallpapers" src="./assets/wallpaper.jpg">

<!-- START_CAPTION -->

*A geometrically perfect formation of cherry blossoms, their delicate petals scattering in a gentle breeze*
Run with model [stabilityai/stable-diffusion-2-1]

<!-- END_CAPTION -->
</center>

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

### Create workflow

Create `.github/workflows/main.yml` workflow with following steps to call the action

```yaml
uses: huuquyet/generate-awesome-wallpapers@v1.2
env: 
    HF_API_TOKEN: ${{ secrets.HF_API_TOKEN }}
```

See [this](.github/workflows/generate-awesome-wallpapers.yml) for example usage

### Update your README

Add a comment block to your `README.md` file

```md
<!-- START_CAPTION -->
<!-- END_CAPTION -->
```

Please check out [my profile](https://github.com/huuquyet) for live demo
