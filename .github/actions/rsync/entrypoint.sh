#!/usr/bin/env bash

# Exit on error. Append "|| true" if you expect an error.
set -o errexit  # same as -e
# Exit on error inside any functions or subshells.
set -o errtrace
# Do not allow use of undefined vars. Use ${VAR:-} to use an undefined VAR
set -o nounset
# Catch the error in case mysqldump fails (but gzip succeeds) in `mysqldump |gzip`
set -o pipefail

printf '\033[33m Warning: This action does not currently support host verification; verification is disabled. \n \033[0m\n'
printf -- 'Setting up SSH... '

ssh_path="$HOME/.ssh"
mkdir "$ssh_path"
touch "$ssh_path/known_hosts"

echo "$SSH_PRIVATE_KEY" > "$ssh_path/deploy_key"
echo "$SSH_PUBLIC_KEY" > "$ssh_path/deploy_key.pub"
chmod 700 "$ssh_path"
chmod 600 "$ssh_path/known_hosts"
chmod 600 "$ssh_path/deploy_key"
chmod 600 "$ssh_path/deploy_key.pub"

eval "$(ssh-agent -s)"
ssh-add "$ssh_path/deploy_key"

printf -- 'Recording known host... '
# below key was created by running the below line from inside karli.rrze
# ssh-keyscan -t ecdsa-sha2-nistp256 karli.rrze.uni-erlangen.de
# below line actually seems ineffectual; we still get "host key verification failed"
echo "$HOST_NAME,$HOST_IP $HOST_FINGERPRINT" \
  >> "$ssh_path/known_hosts"
# $HOST_NAME is used in the above as well as in the below; that's why it is an env
HOST_DEPLOY_STRING="$HOST_USERNAME@$HOST_NAME:$HOST_DESTINATION"
# "args" from main.workflow get append to below call
# these include source, user, $HOST and target
printf -- 'Uploading assets... '
sh -c "rsync $ARGS -e 'ssh -o StrictHostKeyChecking=no' $GITHUB_WORKSPACE/$FOLDER $HOST_DEPLOY_STRING"

printf -- '\033[32m Deployment successful! \033[0m\n'
printf -- '\n'
