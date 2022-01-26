# Dev Studio - Sample Template repo

This repo contains the content for tenants of Developer Studio.


## Directory structure

- /docs : All markdown files are to be placed in this directory
- /assets :  Static assets like image etc here
- /config/document-explorer-definition.yaml : Provide document explorer structure for dev studio.  Also known as the ded (dead) file.
- /config/tenant_api.json : Tenant Provider API 
- /config/product_layout.yaml : Yaml spec for product layout page
- /reference/api-[document.version].yaml : Tenant APIs in OpenAPI 3.0 Spec
- .docignore : Companion file to the ded file.  Use this to hide markdown files from showing up in the doc explorer and from being indexed & searchable

## Setup a new tenant

### Configure tenant.json

The main configuration file for everything.

DO NOT modify the structure.

DO update the sections that are needed.  Look for "REPLACE ME".  You can then replace the text for that field.
