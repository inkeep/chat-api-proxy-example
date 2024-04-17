# proxy-example

## Building the Docker Image

To build the Docker image, navigate to the project root and run the following command:

```bash
docker build -t my-proxy-app .
```

To run your proxy application in a Docker container, use the following command:

```bash
docker run -p 3668:3668 my-proxy-app
