#!/bin/bash

# Create a custom config file for rclone and fill with environment variables
cat > user-rclone.conf <<EOF
[remote]
type = $TYPE
account = $ACCOUNT
key = $KEY
hard_delete = false
EOF

# Create a daily backup script
cat > daily-backup.sh <<EOF
#!/bin/sh

#Daily Backups
rclone copy /persistence remote:bucket/daily/current --backup-dir remote:bucket/daily/`date -I` --create-empty-src-dirs --config /user-rclone.conf
echo "$(date) backed up." >> /home/user/logs/sync.log
EOF

# Create a sync script
cat > daily-backup.sh <<EOF
#!/bin/sh

rclone sync /persistence remote:bucket/sync --exclude 'keystore' --exclude 'trace.json' --exclude '.*{/**,}' --local-no-check-updated --create-empty-src-dirs --config /user-rclone.conf
echo "$(date) data synced" >> /home/user/logs/sync.log
EOF