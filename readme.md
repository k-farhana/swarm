export PATH=${PWD}/bin:$PATH
export TERM=term
docker stack deploy -c docker/docker-compose-ca.yaml hlf

/hosthome/innominds/nodejs-learning/docker-swarm/section/section3

./network.sh up createChannel -ca -c mychannel -s couchdb -i 2.2
docker stack deploy -c docker/docker-compose-cli.yaml hlf

docker run -p 4000:4000 aditya/node-app
cd ../../../api-server/

docker stack deploy -c stack.yaml hlf

docker network create --driver=overlay --attachable test


docker stack deploy -c explorer/docker-compose.yaml hlf