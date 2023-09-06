# Backend Keycloak
Create React webapp for integrating keycloak where user can come and click on login(using Keycloak)
using a Keycloak server via authorization token and realm configuration.

## Requirements
Start Keycloak
From a terminal, enter the following command to start Keycloak:
`docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.1 start-dev`
This command starts Keycloak exposed on the local port `8080` and creates an initial admin user with the username admin and password admin.

## Steps

Clone the repo 
cd React-Keycloak-Integration
`pnpm install`
 Before this make sure Keycloak is up and running on docker
`npm run start`

Click on:http://localhost:3000/
