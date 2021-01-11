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




# instruction
1. manager node  (pwd)
/home/manager/hlf-docker-swarm/test-network
2. docker stack deploy -c docker/docker-compose-ca.yaml hlf
3. source ./organizations/fabric-ca/registerEnroll.sh
4. export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=${PWD}/configtx
5. createOrg1
6. createOrg2
7. createOrderer
8. createOrg3
9. move organizations folder to other nodes


create channel and anchor peer
1. ./scripts/createChannel.sh

