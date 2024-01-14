# Startup lokale ontwikkeling

## Prerequisites
1. Developers startup opgepakt: https://www.notion.so/Developers-startup-7e9fef0b962e4d29abfeb83f8ce667cd

## Setup
1. Clone deze repository naar je lokale ontwikkelomgeving.
2. Maak Docker environment file aan via ```cp .env.local .env``` en pas eventueel ```.env``` aan.
3. Maak je eigen docker compose file ```cp docker-compose.local.yml docker-compose.override.yml```
4. Build het project: ```docker-compose build```
5. Run en run het project: ```docker-compose up -d```

## Run playground
1. Shell in de workspace container: ```docker-compose exec workspace sh```
2. Installeer Yarn: ```yarn```
3. Run Yarn DevServer: ```yarn dev```
4. Je project is nu te benaderen via https://ui.auto.test

## Run storybook
1. Shell in de workspace container: ```docker-compose exec storybook sh```
2. Installeer Yarn: ```yarn```
3. Run Yarn storybook: ```yarn storybook```
4. Je project is nu te benaderen via https://storybook.auto.test

## Build 
1. Shell in de workspace container: ```docker-compose exec workspace sh```
2. build components: ```yarn build```

## Publish
1. Shell in de workspace container: ```docker-compose exec workspace sh```
2. Publish ```npm run publish --public```
