const Docker = require('dockerode');
const fs = require('fs');

const docker = new Docker();

    const containerOpts = {
        Image: 'mongo', // image
        Env: ['MONGO_INITDB_ROOT_USERNAME=admin', 'MONGO_INITDB_ROOT_PASSWORD=secret'], // mongodb env
        ExposedPorts: { '27017/tcp': {} }, // expose 
        HostConfig: { PortBindings: { '27017/tcp': [{ HostPort: '27017' }] } } // map port
      };

    docker.createContainer(containerOpts, (err, container) => {
        if (err) {
        console.error('Error creating container:', err);
        } else {
        container.start((err) => {
            if (err) {
            console.error('Error starting container:', err.message);
            } else {
            console.log('MongoDB container started:', container.id);
            fs.writeFileSync('containerId.txt', container.id);
            }
        });
        }
    });
