#!/bin/bash

# Create a custom config file for rclone and fill with environment variables

if [ $TYPE == "s3" ]
then
   cat > user-rclone.conf <<EOF
[remote]
type = s3
provider = AWS
access_key_id = $ACCESS_KEY_ID
secret_access_key = $SECRET_ACCESS_KEY
region = $REGION
acl = private
EOF
fi

if [ $TYPE == "b2" ]
then
   cat > user-rclone.conf <<EOF
[remote]
type = b2
account = $ACCOUNT
key = $KEY
hard_delete = false
EOF
fi

if [ $TYPE == "spaces" ]
then
   cat > user-rclone.conf <<EOF
[remote]
type = s3
provider = DigitalOcean
env_auth = false
access_key_id = $ACCESS_KEY_ID
secret_access_key = $SECRET_ACCESS_KEY
region =
endpoint = $ENDPOINT
location_constraint =
acl =
server_side_encryption =
storage_class =
EOF
fi

# Create a daily backup script
cat > backup-copy.sh <<EOF
#!/bin/sh

#Daily Backups
rclone copy /persistence remote:$BUCKET/daily/current --backup-dir remote:$BUCKET/daily/`date -I` --create-empty-src-dirs --config /user-rclone.conf
echo "copy backup executed"
EOF

chmod +x backup-copy.sh

# Create a sync script
cat > backup-sync.sh <<EOF
#!/bin/sh

rclone sync /persistence remote:$BUCKET/sync --exclude 'keystore' --exclude 'trace.json' --exclude '.*{/**,}' --local-no-check-updated --create-empty-src-dirs --config /user-rclone.conf
echo "sync backup executed"
EOF

chmod +x backup-sync.sh

# cron test script
cat > cron-test.sh <<EOF
#!/bin/sh

echo "Some text here."

EOF

chmod +x cron-test.sh