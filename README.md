[![Generate awesome wallpapers](https://github.com/huuquyet/generate-awesome-wallpapers/actions/workflows/generate-awesome-wallpapers.yml/badge.svg)](https://github.com/huuquyet/generate-awesome-wallpapers/actions/workflows/generate-awesome-wallpapers.yml) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](.github/CODE_OF_CONDUCT.md)

# Generate awesome wallpapers with javascript action

This action generate awesome wallpapers using HuggingFace Inference API (serverless) to call text-to-image models

**🖼️ This awesome wallpaper generated automatically everyday**

<div align="center">
  <img alt="Awesome Wallpapers" src="./assets/wallpaper.jpg">

<!-- START_CAPTION -->
*A celestial display of the Northern Lights dancing above a pristine, snow-dusted pine forest* by [stabilityai/stable-diffusion-3-medium-diffusers](https://hf.co/stabilityai/stable-diffusion-3-medium-diffusers)
<!-- END_CAPTION -->
</div>

**Want to change another awesome wallpaper?** Just click [this](https://github.com/huuquyet/generate-awesome-wallpapers/issues/new?assignees=&labels=wallpaper&projects=&title=Please+a+serene+Zen+garden+with+carefully+placed+rocks+and+raked+sand&body=Feel+free+to+change+the+title+except+Please+then+press+Submit%21)
*or create a new issue with title starts with `Please` and add `wallpaper` label*

## API Token

### `HF_API_TOKEN`

**Required** Get API Token from [your HuggingFace profile settings](https://huggingface.co/settings/tokens)

Then add to the [secrets for the repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

## List of models

- [black-forest-labs/FLUX.1-dev](https://hf.co/black-forest-labs/FLUX.1-dev)
- [black-forest-labs/FLUX.1-schnell](https://hf.co/black-forest-labs/FLUX.1-schnell)
- [XLabs-AI/flux-ip-adapter](https://hf.co/XLabs-AI/flux-ip-adapter)
- [latent-consistency/lcm-lora-sdxl](https://hf.co/latent-consistency/lcm-lora-sdxl)
- [Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro](https://hf.co/Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro)
- [stabilityai/stable-diffusion-3-medium-diffusers](https://hf.co/stabilityai/stable-diffusion-3-medium-diffusers)

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
with:
  random: true
```

See [this](.github/workflows/generate-awesome-wallpapers.yml) for example usage

### Update your README

Add a comment block to your `README.md` file

```md
<!-- START_CAPTION -->
<!-- END_CAPTION -->
```

Please check out [my profile](https://github.com/huuquyet) for live demo
