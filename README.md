# proxy-example
This repository is a template for how to build/deploy a proxy for inkeep as docker image to cloud provider of your choice.

## 1. Build the Docker Image

To build the Docker image, navigate to the project root and run the following command:

```bash
docker build -t my-proxy-app .
```

You can test the image locally with the use the following command:

```bash
docker run -p 3000:3000 my-proxy-app
```


## 2. Push the image to your cloud provider registry

You can push this image to your cloud providers container registry.


## 3. Deploy the container to the cloud

For GCP, you can use a service like Cloud Run.

The following is a guide to setting up the proxy in Google Cloud Platform. https://inkeep.notion.site/Inkeep-GCP-Example-d42733ee72874696a8c6bbc4a1edca94?pvs=4

## 4. Configure your inkeep chat widget to point at the proxy instead

Make sure to set [chatApiProxyDomain on your InkeepWidgetBase settings](https://docs.inkeep.com/ui-components/common-settings/base#inkeepwidgetbasesettings)

## 5. Next steps

Consider modifying the proxy example to implement your own authentication mechanism or add your own logging






