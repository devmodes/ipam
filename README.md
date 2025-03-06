# IP Address Management System

### Setup

1. Clone the application

`git clone https://github.com/devmodes/ipam.git`

2. Navigate to the cloned project

`cd ipam`

3. Setup the `.env` variables by copying each the `.env.example` on each services.

```
cp ./auth-service/.env.example ./auth-service/.env
cp ./gateway-service/.env.example ./gateway-service/.env
cp ./ip-service/.env.example ./ip-service/.env
cp ./log-service/.env.example ./log-service/.env
cp ./web/.env.example ./web/.env
```

or run `bash setup.sh` in your git bash if you are on windows

4. Build the docker containers by running `docker compose build`

5. After building the containers you can run `docker compose up`

6. Once it finishes with the running and there is no error you can visit the app in `http://localhost:3000`
