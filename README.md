# IP Address Management System

### Setup

1. Clone the application

```
git clone https://github.com/devmodes/ipam.git
```

2. Navigate to the cloned project

```
cd ipam
```

3. Setup the `.env` variables by copying each the `.env.example` on each services.

Run
```
bash setup.sh
```
  or manualy
```
cp ./auth-service/.env.example ./auth-service/.env
cp ./gateway-service/.env.example ./gateway-service/.env
cp ./ip-service/.env.example ./ip-service/.env
cp ./log-service/.env.example ./log-service/.env
cp ./web/.env.example ./web/.env
```

4. Build the docker containers by running
```
docker compose build
```

5. After building the containers you can run
```
docker compose up
```

6. Once it finishes with the running and there is no error you can visit the app
```
http://localhost:3000
```

### Credentials

1. Admin account
Email:
```
john@admin.com
```
Password:
```
password
```

2. User Account
Email:
```
jane@user.com
```
Password:
```
password
```
