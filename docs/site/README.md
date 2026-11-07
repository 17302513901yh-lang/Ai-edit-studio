# AI Edit Studio project website

Static GitHub Pages source. Preview from the repository root:

```sh
python3 -m http.server 8090 --directory docs/site
node tools/check-site.mjs
```

Open http://localhost:8090/. The page requires no build, npm packages, analytics or server.
The timeline is an explicitly labelled interactive illustration, not a hosted video editor. The actual editor runs locally after installation.

The Project website workflow validates pull requests and deploys docs/site on main. In repository Settings → Pages select GitHub Actions as the source. Production URL: https://laaielichter.github.io/Ai-edit-studio/.

Brand assets are in assets/: icon.png is the generated app icon; desert-still.png is generated illustrative footage, not a product screenshot. social-card.png is the rendered sharing card. Reusable app branding lives in public/brand/; keep its icon identical to the website icon. No version or package release is performed by publishing the site.
