const fs = require('fs');
const Docker = require('dockerode');

const docker = new Docker();
const containerIdFilePath = 'containerId.txt'

if(fs.existsSync(containerIdFilePath)){
  const containerId = fs.readFileSync(containerIdFilePath, 'utf-8').trim();
  const container = docker.getContainer(containerId);
  
  container.stop((err) => {
      if (err) {
        console.error('Error stopping container:', err);
      } else {
        console.log('Container stopped:', containerId);
  
        container.remove((err) => {
          if (err) {
            console.error('Error deleting container:', err);
          } else {
            console.log('Container deleted:', containerId);
            fs.unlinkSync(containerIdFilePath);
          }
        });
      }
    });
}else{
  console.log('container not available')
}

