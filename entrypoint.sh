#!/bin/bash

# Start the run once job.
echo "Docker container has been started"

declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

# Create backup scripts
./setup-scripts.sh

# Setup a cron schedule
echo "SHELL=/bin/bash
BASH_ENV=/container.env
0 4 * * * /backup-copy.sh >> /var/log/cron.log 2>&1
*/5 * * * * /backup-sync.sh >> /var/log/cron.log 2>&1
* * * * * /cron-test.sh >> /var/log/cron.log 2>&1
# This extra line makes it a valid cron" > scheduler.txt

crontab scheduler.txt
cron -f