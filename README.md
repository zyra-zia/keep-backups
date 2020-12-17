# keep-backups

Creates a docker container that runs a cron job that backups and syncs the keep persistence directory to Backblaze B2, AWS S3 and Digital Ocean Spaces.

The docker container should be run on the same server that is running the keep beacon or ecdsa node.

The container image is uploaded at https://hub.docker.com/repository/docker/zyggy/keep-backups

To build locally, clone this repository and run the following command:
#### `docker build --tag keep-backups`

## Web App
The web app is a create-react-app that generates the docker run command to use for running the container. It can be viewed at https://keep-backups.web.app

To build locally, clone this repository and run the following command:
#### `npm install`
#### `npm run start`
