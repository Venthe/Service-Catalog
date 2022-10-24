# Example service

Description for the service

## Tags

_example_

## Owners

- **Email:** [john.doe@example.com](john.doe@example.com)  
  **Role:** Product Owner  
- **Name:** Sample Team  
  **Email:** [sample.team@example.com](sample.team@example.com)  
  **Role:** Development team  

## Links

- [Read me](https://git.example.com/Example-Service/blob/main/readme.md) - Main readme for the service  
- [Wiki](https://wiki.example.com/Example-Service) - Main documentation store  
- [Wiki](https://git.example.com/Example-Service/blob/main/documentation/api/contract.openapi.yml) - API contract  

## Metadata

- **Identifier:** example-service/dev  
  **Cluster:** staging  
  **Type:** Kubernetes  
- **Identifier:** example-service/uat  
  **Cluster:** staging  
  **Type:** Kubernetes  
- **Identifier:** example-service  
  **Cluster:** production  
  **Type:** Kubernetes  
- **Identifier:** [9a653a75-3523-4df1-a5dc-ad5f074ad64c](https://oncall.grafana.example.com/9a653a75-3523-4df1-a5dc-ad5f074ad64c)  
  **Type:** Grafana on call  
- **Repository:** Github  
  **URL:** [https://git.example.com/Example-Service](https://git.example.com/Example-Service)  

## Custom metadata

### Observability

#### Alerts

- ☐ Container host alerts are properly configured (e.g. Memory, ulimit, CPU, Swap)  
- ☐ Container specific alerts are properly configured (e.g. JVM Heap)  
- ☐ Suspicious request detection is set up  

#### Metrics

- ☐ Service exposes metrics in Prometheus format.  
- ☐ Service exposes state of a dependent subsystems as a Prometheus metrics.  
- ☐ Prometheus is scraping metrics from service endpoints.  
- ☐ Prometheus metrics naming should follow Micrometer recommendations (https://prometheus.io/docs/practices/naming/).  
- ☐ Service metric endpoint should be publicly accessible.  
- ☐ Business monitoring custom metrics are exposed (e.g. number of clients, number of transactions for client/service journey analysis, order cancellations).  
- ☐ (WIP) Service is linked with Spring-boot admin application for additional debugging options.  

#### Dashboards

- ☐ Service has data (metrics) for Micrometer visualisation.  
  - [https://grafana.example.com/dashboards/1](https://grafana.example.com/dashboards/1)  
  - [JVM statistics](https://grafana.example.com/dashboards/2)  

#### Logging

- ☐ Service is streaming logs entries to /std/out in plain text format (Allows for a human-readable access).  
- ☐ Service is streaming logs in JSONL format (Allows for a machine-readable access).  
- ☐ Service JSONL logs are ingested by the log aggregator.  
- ☐ Service has no DEBUG level enabled by default.  
- ☐ Log entries should have X-Correlation-ID (OpenTracing standard).  

#### Tracing

- ☐ Service is using tracing for dependent subsystems (database, message queue, cache, etc).  
- ☐ Service should expose X-Correlation-ID header for identifying all underlaying systems (OpenTracing standard).  
- ☐ Service is able to identify which application is requesting the data  


### Operational

#### Generic

- ☐ Service has a deployment manifest in a declarative format stored in git (helm chart, helm values, GitOps release manifest, etc).  
- ☐ Service is using an automated approach to migrate its database.  
- ☐ Service is using an automated approach to rollback its database changes.  
- ☐ Service has clear and accessible information about current release in the environment.  
- ☐ Service has clear and accessible information about values used for current release.  
- ☐ Service deployment has release history that can be used for efficient rollback.  
- ☐ No manual operation needed for service release.  
- ☐ Service should be stateless. No volumes or any kind of persistence should be provided.  
- ☐ Only service has access to its data (database, etc). Any kind of access to data should be provided via API.  
- ☐ Service is using a clear and consistent versioning schema (i.e. SemVer, CalVer, Stable Consecutive ID's)  
- ☐ Service exposes debug ports on non-production environments  

#### Deployment Pipeline

##### Continuous Integration

- ☐ Service has Continuous Integration build attached  
- ☐ Service has code formatting checker attached to pipeline, which posts results to MR.  
- ☐ Service has code dependency analyzer attached to pipeline, which posts results to MR.  
- ☐ Service has static code analyzer attached to pipeline, which posts results to MR.  
- ☐ Service has profanity filter attached to pipeline, which posts results to MR.  
- ☐ Service has unit tests attached to pipeline, which posts results to MR.  
- ☐ Service has integration tests attached to pipeline, which posts results to MR.  
- ☐ Service has soak tests attached to pipeline, which posts results to owners.  
- ☐ Service has performance tests attached to pipeline, which posts results to owners.  
- ☐ Service has E2E tests attached to pipeline, which posts results to owners.  
- ☐ Service has chaos tests attached to pipeline, which posts results to owners.  
- ☐ Service has commit message validation attached to pipeline, which posts results to MR.  

##### Continuous Delivery

- ☐ Service can be deployed at any given point without manual steps.  
- ☐ After each commit, service is in a deployable state.  


#### Containers

- ☐ Container version is not using a moving tag (e.g. latest)  
- ☐ Docker entrypoint script usage service should use process manager (E.g. https://github.com/krallin/tini)  
- ☐ Container build uses docker build best-practices (https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)  

#### Documentation

- ☐ Application's name, description, ownership and dependencies are clearly documented in repository.  
- ☐ Architecture decision records are strored in repository.  
- ☐ Responsible contacts are noted inside of the repository.  
- ☐ Documentation about release process is present in the repository.  
- ☐ Documentation from repository is deployed to Wiki.  
- ☐ Software Bill of Materials is stored alongside deployment artifact.  
- ☐ Release notes are stored alongside deployment artifact.  

#### Security

- ☐ Sensitive informations are stored in a secret manager (E.g. vault).  
- ☐ Non sensitive information are stored in a values for particular environment deployment (GitOps)  
- ☐ Continuous Integration verifies that no secret is exposed by any commit (Private key, passwords, tokens, etc.)  
- ☐ Secrets are rotated periodically (E.g each 30d; passwords, tokens and private keys)  

#### GDPR

- ☐ Sensitive data is identified.  
- ☐ Sensitive data has a mechanism of anonymization.  
- ☐ Access to sensitive data is logged.  
- ☐ Interested party is informed about anonymization  


### Reliability

#### Incident Management

- ☐ Service is covered by a 24/7 support  
- ☐ At least two people are available for on-call in any given moment  
- ☐ Incident response system is set up.  

#### Application

- ☐ Service is deployed in more then 1 replica  
- ☐ Pod disruption budget is defined for workload (https://kubernetes.io/docs/tasks/run-application/configure-pdb/).  
- ☐ No more than particular % of replicas could be unavailable (50% for example) in particular period of time.  
- ☐ Service can be scaled horizontally manually to handle changes in the workload.  
- ☐ Service automatically scales horizontally to handle fluctuating workloads (e.g. via Prometheus metrics).  
- ☐ Service CPU/Memory limit and request are set  
- ☐ Service has a well-known health check endpoint /health  
- ☐ Readiness Probe is defined and used  
- ☐ Liveness Probe is defined and used  
- ☐ Startup Probes is defined and used  
- ☐ Service has a graceful degradation mechanism  
- ☐ Service has zero-downtime deployments.  
- ☐ Service has a graceful shutdown. Ensure that stopping the service is not going to cause issues.  
- ☐ Service handles failure of dependencies (Database, Kafka, Cache engine, etc.) gracefully (e.g. by readiness probe).  
- ☐ Service has podAntiAffinity policies. One instance of microservice shouldn't be hosted with another service replica on the same node.  
- ☐ Service has a topology key which allows service be spread across at least two data centres  
- ☐ Service configuration is only using DNS entries for addresses.  
- ☐ Service is using a Circuit Breaker for any outbound connections.  

#### Persistence

- ☐ Service has Recovery Time Objective (RTO) defined (RTO is the maximum acceptable delay between the interruption of service and restoration of service)  
- ☐ Service has Recovery Point Objective (RPO) defined ( RPO is the maximum acceptable amount of time since the last data recovery point)  
- ☐ Cache unavailability, staleness or misses are not affecting service availability and service functionality  
- ☐ Ensure that databases are spread across at least two data centres  


### Development best practices

- ☐ API is defined as contracts (i.e. Kafka Avro, OpenApi)  
- ☐ GIT commits are following best practices (https://cbea.ms/git-commit/)  
- ☐ GIT commits are using a well-defined schema (E.g. conventional commits)  
- ☐ Developer workstation can be set-up with a single command  
- ☐ Application development dependencies can be set up with a single command  
- ☐ New features are developed behind feature flags  
- ☐ New features have logs that allow for a full debug from logs alone  
- ☐ Persistence migration scripts have rollback mechanisms  
- ☐ Every dependency version is pinned  

