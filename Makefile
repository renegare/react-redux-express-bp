
DOCKER_IMAGE=react-redux-express-bp
BRANCH=$(shell git symbolic-ref --short HEAD)
VERSION=$(BRANCH)-$(shell git rev-parse HEAD)

build: build-version build-assets build-image

build-version:
	echo $(VERSION) > VERSION

build-assets:
	npm run build

build-image:
	docker build -t $(DOCKER_IMAGE):latest .
	docker tag $(DOCKER_IMAGE):latest \
		$(DOCKER_IMAGE):$(VERSION)
	-docker ps -qaf status=exited | xargs docker rm
	-docker images -qaf dangling=true | xargs docker rmi
	docker images | grep $(DOCKER_IMAGE)
