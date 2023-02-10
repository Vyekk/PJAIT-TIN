# TIN MP02
## How to run this app?
1. Go to project location and install dependencies:
```
cd [project location]
npm i
```
2. Open `/docker/docker-compose.yml` file and check ports.
3. Run docker:
```
cd docker
docker-compose up
```
4. Run server:
```
cd ..
npm run start
```
5. Open http://localhost:3000/