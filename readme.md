# TIN MP02
## How to run this app?
1. Go to project location and install dependencies:
```
cd [project location]
npm i
```
1. Open `/docker/docker-compose.yml` file and check ports.
2. Run docker:
```
cd docker
docker-compose up
```
3. Run server:
```
cd ..
npm run start
```
4. Open http://localhost:3000/