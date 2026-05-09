-include .env.local
export

LOCAL_IMAGE=$(IMAGE_NAME):$(IMAGE_TAG)
REMOTE_IMAGE=$(DOCKER_REGISTRY)/$(GCP_PROJECT_ID)/$(ARTIFACT_REGISTRY_REPO)/$(IMAGE_NAME):$(IMAGE_TAG)

.PHONY: \
	gcloud-login \
	gcloud-adc-login \
	gcloud-impersonate \
	podman-login \
	create-artifact-repo \
	podman-build \
	podman-tag \
	podman-push \
	gcloud-deploy \
	deploy 

gcloud-login:
	gcloud auth login

gcloud-adc-login:
	gcloud auth application-default login --impersonate-service-account=$(GCP_SERVICE_ACCOUNT)

gcloud-impersonate:
	gcloud config set auth/impersonate_service_account $(GCP_SERVICE_ACCOUNT)

podman-login:
	gcloud auth application-default print-access-token | podman login -u oauth2accesstoken --password-stdin $(DOCKER_REGISTRY)

create-artifact-repo:
	gcloud artifacts repositories create $(ARTIFACT_REGISTRY_REPO) --repository-format=docker --location=$(GCP_REGION) --description="$(ARTIFACT_REGISTRY_DESCRIPTION)" --project=$(GCP_PROJECT_ID)

podman-build:
	podman build \
		--build-arg HTTP_PROXY=$(HTTP_PROXY) \
		--build-arg HTTPS_PROXY=$(HTTPS_PROXY) \
		--build-arg http_proxy=$(HTTP_PROXY) \
		--build-arg https_proxy=$(HTTPS_PROXY) \
		--build-arg NO_PROXY=$(NO_PROXY) \
		--build-arg no_proxy=$(NO_PROXY) \
		-t $(LOCAL_IMAGE) .



podman-tag:
	podman tag $(LOCAL_IMAGE) $(REMOTE_IMAGE)

podman-push:
	podman push $(REMOTE_IMAGE)

gcloud-deploy:
	gcloud run deploy $(CLOUD_RUN_SERVICE) \
		--image=$(REMOTE_IMAGE) \
		--project=$(GCP_PROJECT_ID) \
		--region=$(GCP_REGION) \
		--platform=managed \
		--service-account=$(GCP_SERVICE_ACCOUNT) \
		--memory=$(CLOUD_RUN_MEMORY) \
		--cpu=$(CLOUD_RUN_CPU) \
		--port=$(CONTAINER_PORT) \
		--allow-unauthenticated \
		--ingress=$(CLOUD_RUN_INGRESS) \
		--vpc-egress=$(CLOUD_RUN_VPC_EGRESS) \
		--vpc-connector=$(GCP_VPC_CONNECTOR) \
		--timeout=$(CLOUD_RUN_TIMEOUT)

deploy:
	$(MAKE) podman-build
	$(MAKE) podman-tag
	$(MAKE) podman-push
	$(MAKE) gcloud-deploy