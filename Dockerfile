FROM ubuntu:16.04

# Install prerequisites
RUN apt-get update && apt-get install -y curl && apt-get install -y sudo && apt-get install -y unzip && apt-get install -y wget

# Install rclone
RUN curl https://rclone.org/install.sh | sudo bash

# Install setup script for rclone config
RUN wget https://raw.githubusercontent.com/zyra-zia/keep-backups/main/setup-conf.sh && chmod +x setup-conf.sh

CMD ./setup-conf.sh