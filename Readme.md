# Web shell - quick way to execute common commands in docker containers

## Usage
1. `docker-comnpose up -d`
2. Browse to `http://localhost:10000`
3. Create a json file called `config.js` in the root with your commands.

### Format of config.js
```
{
  "app": [
    "composer install"
  ]
}
```

The property names are the container names, and the value is an array with available commands.

## Development
### Run a temporary container for Yarn commands

`docker run -it -v ${PWD}:/app -u="1000:1000" -w="/app" node:12 bash`
