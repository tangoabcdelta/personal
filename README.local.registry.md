# Local Docker

Build and push/pull our images without relying on external services like GCR or ACR (Google / Azure Container Registry) or even docker hub etc.


Use the existing registry package for this:

```bash
docker run -d -p 5000:5000 --name registry registry:latest
Push / Pull
```

Now we can simply pull and push into this repository:

```bash
docker image tag my-image localhost:5000/my-image
docker push localhost:5000/my-image
docker pull ...
```


### View Images

To display available images we can simply run:

```bash
$ curl -X GET http://localhost:5000/v2/_catalog
{"repositories":["my-image"]}
```
Here you can check the repository API ref.

### Start Registry Again
After reboot (or just docker boot) we can run our registry again with:

```bash
docker start registry
```

Another solution would be to use the `--restart=always` parameter:

```bash
docker run -d -p 5000:5000 --name registry --restart=always registry:latest
```

### Remove Registry
```bash
docker container stop registry && docker container rm -v registry
```
For more detailed information, maybe to even use your own registry in production, visit https://docs.docker.com/registry/deploying/