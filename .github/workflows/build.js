name: Pages Build and Deployment

on:
  push:
    branches: ["main"]   # Deploy when pushing to main
  workflow_dispatch:      # Allow manual deployment

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # If your project does NOT need Node, remove the next 3 steps
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      # Upload the build output folder
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist  # CHANGE to build/ or out/ if needed

  deploy:
    runs-on: ubuntu-latest
    needs: build

    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deploy
        uses: actions/deploy-pages@v4
