FROM ubuntu:16.04

# Install prerequisites
RUN apt-get update && apt-get install -y curl && apt-get install -y sudo && apt-get install -y unzip && apt-get install -y cron

# Install rclone
RUN curl https://rclone.org/install.sh | sudo bash

# Install setup script for rclone config
COPY setup-scripts.sh /setup-scripts.sh
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /setup-scripts.sh /entrypoint.sh

ENTRYPOINT /entrypoint.sh