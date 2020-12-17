# keep-backups

Creates a docker container that runs a cron job that backups and syncs the keep persistence directory to Backblaze B2, AWS S3 and Digital Ocean Spaces.
Backups and syncing is done using RClone, the cron job makes a daily copy and syncs every five minutes to the chosen storage provider.
Use the web app at https://keep-backups.web.app to generate the docker run command with the correct environment variables.

Support for user specified cron intervals and more storage providers is coming soon!

The docker container should be run on the same server that is running the keep beacon or ecdsa node.

The container image is uploaded at https://hub.docker.com/repository/docker/zyggy/keep-backups

To build locally, clone this repository and run the following command:
#### `docker build --tag keep-backups`

## Web App
The web app is a create-react-app that generates the docker run command to use for running the container. It can be viewed at https://keep-backups.web.app

To build locally, clone this repository and run the following command:
#### `npm install`
#### `npm run start`
