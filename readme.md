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

docker node update --label-add name=manager manager


# instruction
1. manager node  (pwd)
/home/manager/hlf-docker-swarm/test-network
2. docker stack deploy -c docker/docker-compose-ca.yaml hlf
3. source ./organizations/fabric-ca/registerEnroll.sh in all nodes
4. export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=${PWD}/configtx
5. createOrg1 in manager
6. createOrg2 in worker1
7. createOrg3 in worker2
8. createOrderer in manager
9. move org2 and org3 folder to manager
10. create genesis block ./scripts/createGenesis.sh



# create channel and anchor peer
1. ./scripts/createChannelTx.sh


# deploy peers and orderer
1. docker stack deploy -c docker/docker-compose-test-net.yaml -c docker/docker-compose-couch.yaml hlf
2. make sure the channel artifacts are present on manager

# CLI
1. start cli
2. docker stack deploy -c docker/docker-compose-cli.yaml hlf


create channel 
join channel 
update anchor peer

package cc
copy cc to other host
install cc in all orgs
approve in all orgs

commit in any org

invoke

source  ./organizations/ccp-generate.sh
geneate ccp

build image

docker