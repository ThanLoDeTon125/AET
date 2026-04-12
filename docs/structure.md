# Project structure

## Current layout

```text
e:\project\aeterna
  index.html
  docs/
    structure.md
  tools/
    css/
      scale_css.py
      restore_css.py
  assets/
    css/
      base/
        reset.css
        variables.css
      layout/
        navbar.css
        sidebar.css
      sections/
        hero.css
        character-slider.css
        hero-detail.css
        world-map.css
      main.css
    js/
      app.js
      navigation/
        Navbar.js
        Sidebar.js
      sections/
        Hero.js
        CharacterSlider.js
        HeroDetail.js
      content/
        assets.js
        characters.js
    media/
      images/
        backgrounds/
          bg1.png
      videos/
        bgvid.mp4
        bgvid-web.mp4
        bgvid-hq.mp4
        bgvid2.mp4
        bgvid2-web.mp4
        bgvid2-hq.mp4
      shapes/
        shape.svg
  .vscode/
    settings.json
```

## Folder rules

- `assets/css/base/`: reset, variables, and cross-project tokens.
- `assets/css/layout/`: persistent shell UI such as navbar and sidebar.
- `assets/css/sections/`: section-specific styling for landing page blocks.
- `assets/js/navigation/`: navigation UI and nav-only behavior.
- `assets/js/sections/`: section rendering modules.
- `assets/js/content/`: copy, registry data, and content models.
- `assets/media/`: all local binary assets grouped by type.
- `tools/css/`: one-off utility scripts that mutate CSS output.

## Recommended next cleanup

- Rename `assets/js/content/characters.js` to `site-content.js` because the data is now platform content, not characters.
- Rename `assets/css/sections/world-map.css` to `atlas-section.css` when downstream imports are stable.
- Gradually replace temporary Figma MCP URLs in `assets/js/content/assets.js` with local assets under `assets/media/`.
- If the page grows beyond one route, split `assets/css/main.css` into `globals.css` and `landing.css`.