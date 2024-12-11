# SmartLink SDK

## Table of Contents

- [Introduction](#introduction)
- [Examples](#examples)
  - [Example 1: Init client locally](#example-1-init-client-locally)
  - [Example 2: Configure client globally](#example-2-configure-client-globally)
- [SDK Functions](#sdk-functions)
  - [getAppByClientId](#getappbyclientid)
  - [postApp](#postapp)
  - [putAppByClientId](#putappbyclientid)
  - [deleteAppByClientId](#deleteappbyclientid)
  - [getApps](#getapps)
  - [postApps](#postapps)
  - [getEvents](#getevents)
  - [getFolderById](#getfolderbyid)
  - [deleteFolderById](#deletefolderbyid)
  - [postFolder](#postfolder)
  - [getFolders](#getfolders)
  - [postMembershipByIdDeactivate](#postmembershipbyiddeactivate)
  - [getMembershipById](#getmembershipbyid)
  - [putMembershipById](#putmembershipbyid)
  - [deleteMembershipById](#deletemembershipbyid)
  - [postMembership](#postmembership)
  - [getMemberships](#getmemberships)
  - [postMemberships](#postmemberships)
  - [getMembershipsSearch](#getmembershipssearch)
- [Schemas](#schemas)
  - [User](#user)
  - [Folder](#folder)
  - [App](#app)

## Introduction

The SmartLink SDK allows you to make requests to the SmartLink API. To use the SDK, you need to obtain an API key from your SmartLink account via the Workflow administrator menu.

## Examples

### Example 1: Init client locally

```typescript
import { createClient } from "@hey-api/client-fetch";
import { getApps } from "../client";

const fetch = async () => {
  const client = createClient({
    baseUrl: "https://<your_smartlink_url>/api/workflow",
    headers: {
      "x-api-key": "<your_secret_api_key>",
    },
  });
  const apps = await getApps({ client });
  console.log("apps", apps.data);
};

fetch();
```

### Example 2: Configure client globally

```typescript
import { client, getApps } from "../client";

client.setConfig({
  baseUrl: "https://<your_smartlink_url>/api/workflow",
  headers: {
    "x-api-key": "<your_secret_api_key>",
  },
});

const fetch = async () => {
  const apps = await getApps();
  console.log("apps", apps.data);
};

fetch();
```

## SDK Functions

### getAppByClientId

Fetches an app by its unique ID.

```typescript
await getAppByClientId({
  params: {
    clientId: "app_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| clientId   | string | true     |         |

#### Response

> 200: The [App](#app)

> 401: Not authorized

> 404: App not found

> 500: Internal server error

### postApp

Creates a new app for your organization

```typescript
await postApp({
  body: {
    title: "App title",
    url: "https://app.com",
    iconUrl: "https://app.com/icon.png",
    description: "App description",
    slug: "my_unique_slug",
  },
});
```

#### Body

| Parameters  | type   | required | default                                               |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| title       | string | true     |                                                       |
| url         | string | false    | null                                                  |
| iconUrl     | string | false    | null (icons are automatically retrieved by smartlink) |
| description | string | false    | null                                                  |
| slug        | string | false    | auto generated (randomUUID)                           |

#### Response

> 200: The added [App](#app)

> 401: Not authorized

> 500: Internal server error

### putAppByClientId

Updates an app by its client ID.

```typescript
await putAppByClientId({
  params: {
    clientId: "your_client_id",
  },
  body: {
    title: "Updated title",
    url: "https://updated-url.com",
    iconUrl: "https://updated-url.com/icon.png",
    description: "Updated description",
    slug: "updated_slug",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| clientId   | string | true     |         |

#### Body

| Parameters  | type   | required | default |
| ----------- | ------ | -------- | ------- |
| title       | string | true     |         |
| url         | string | false    | null    |
| iconUrl     | string | false    | null    |
| description | string | false    | null    |
| slug        | string | false    | null    |

#### Response

> 200: The updated [App](#app)

> 401: Not authorized

> 404: App not found

> 500: Internal server error

### deleteAppByClientId

Deletes an app by its client ID.

```typescript
await deleteAppByClientId({
  params: {
    clientId: "your_client_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| clientId   | string | true     |         |

#### Response

> 200: The deleted [App](#app)

> 401: Not authorized

> 404: App not found

> 500: Internal server error

### getApps

Get all apps of your organization.

```typescript
const apps = await getApps();
```

#### Response

| Field | type  | description  |
| ----- | ----- | ------------ |
| apps  | array | List of apps |

### postApps

Creates multiple apps for your organization.

```typescript
await postApps({
  body: [
    {
      title: "App title 1",
      url: "https://app1.com",
      iconUrl: "https://app1.com/icon.png",
      description: "App description 1",
      slug: "unique_slug_1",
    },
    {
      title: "App title 2",
      url: "https://app2.com",
      iconUrl: "https://app2.com/icon.png",
      description: "App description 2",
      slug: "unique_slug_2",
    },
  ],
});
```

#### Body

| Parameters  | type   | required | default |
| ----------- | ------ | -------- | ------- |
| title       | string | true     |         |
| url         | string | false    | null    |
| iconUrl     | string | false    | null    |
| description | string | false    | null    |
| slug        | string | false    | null    |

#### Response

> 200: Array of created [Apps](#app)

> 401: Not authorized

> 500: Internal server error

### getEvents

Retrieve log events with various filters.

```typescript
const events = await getEvents({
  params: {
    filter: "your_filter",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| filter     | string | false    | null    |

#### Response

> 200: Array of [events](#event)

> 401: Not authorized

> 500: Internal server error

### getFolderById

Fetches a folder by its ID.

```typescript
await getFolderById({
  params: {
    id: "your_folder_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: The [Folder](#folder)

> 401: Not authorized

> 404: Folder not found

> 500: Internal server error

### deleteFolderById

Deletes a folder resource identified by the given ID.

```typescript
await deleteFolderById({
  params: {
    id: "your_folder_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: The deleted [Folder](#folder)

> 401: Not authorized

> 404: Folder not found

> 500: Internal server error

### postFolder

Creates a new folder within your organization.

```typescript
await postFolder({
  body: {
    name: "Folder name",
    description: "Folder description",
  },
});
```

#### Body

| Parameters  | type   | required | default |
| ----------- | ------ | -------- | ------- |
| name        | string | true     |         |
| description | string | false    | null    |

#### Response

> 200: The created [Folder](#folder)

> 401: Not authorized

> 500: Internal server error

### getFolders

Get all folders of your organization.

```typescript
const folders = await getFolders();
```

#### Response

> 200: Array of [Folder](#folder)

> 401: Not authorized

> 500: Internal server error

### postMembershipByIdDeactivate

Updates a membership's status to "INACTIVE" by its ID.

```typescript
await postMembershipByIdDeactivate({
  params: {
    id: "your_membership_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: The updated [User](#user)

> 401: Not authorized

> 404: User not found

> 500: Internal server error

### getMembershipById

Fetches a membership by its ID.

```typescript
await getMembershipById({
  params: {
    id: "your_membership_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: The [User](#user)

> 401: Not authorized

> 404: User not found

> 500: Internal server error

### putMembershipById

Updates a membership by its ID.

```typescript
await putMembershipById({
  params: {
    id: "your_membership_id",
  },
  body: {
    name: "Updated name",
    status: "Updated status",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Body

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| name       | string | true     |         |
| status     | string | true     |         |

#### Response

> 200: The updated [User](#user)

> 401: Not authorized

> 404: User not found

> 500: Internal server error

### deleteMembershipById

Deletes a membership resource identified by the given ID.

```typescript
await deleteMembershipById({
  params: {
    id: "your_membership_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: The deleted [User](#user)

> 401: Not authorized

> 404: User not found

> 500: Internal server error

### postMembership

Creates a new membership for your organization.

```typescript
await postMembership({
  body: {
    name: "Membership name",
    status: "Membership status",
  },
});
```

#### Body

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| name       | string | true     |         |
| status     | string | true     |         |

#### Response

> 200: The created [User](#user)

> 401: Not authorized

> 500: Internal server error

### getMemberships

Get all memberships of your organization.

```typescript
const memberships = await getMemberships();
```

#### Response

> 200: Array of [User](#user)

> 401: Not authorized

> 500: Internal server error

### postMemberships

Creates multiple memberships for your organization.

```typescript
await postMemberships({
  body: [
    {
      name: "Membership name 1",
      status: "Membership status 1",
    },
    {
      name: "Membership name 2",
      status: "Membership status 2",
    },
  ],
});
```

#### Body

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| name       | string | true     |         |
| status     | string | true     |         |

#### Response

> 200: Array of created [Users](#user)

> 401: Not authorized

> 500: Internal server error

### getMembershipsSearch

Search memberships with various filters.

```typescript
const memberships = await getMembershipsSearch({
  params: {
    filter: "your_filter",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| filter     | string | false    | null    |

#### Response

> 200: Array of [User](#user)

> 401: Not authorized

> 500: Internal server error

## Schemas

### User

| Field          | type    | description                          |
| -------------- | ------- | ------------------------------------ |
| id             | integer | Membership unique ID                 |
| role           | string  | Membership role (OWNER, USER, ADMIN) |
| organizationId | integer | Unique ID of the organization        |
| userId         | integer | Unique ID of the user                |
| createdAt      | Date    | Creation date                        |
| updatedAt      | Date    | Last update date                     |
| status         | string  | Membership status (ACTIVE, INACTIVE) |
| language       | string  | Preferred language (ex 'en')         |
| name           | string  | User's name                          |
| firstName      | string  | User's first name                    |
| email          | string  | User's email address                 |
| phone          | string  | User's phone number                  |

### Folder

| Field          | type    | description                           |
| -------------- | ------- | ------------------------------------- |
| id             | integer | Folder unique ID                      |
| name           | string  | Folder name                           |
| forAllUsers    | boolean | Indicates if folder is for all users  |
| organizationId | integer | Unique ID of the organization         |
| parentId       | integer | Unique ID of the parent folder        |
| path           | string  | Full path of the folder (/NewYork/HR) |

### App

| Field          | type    | description                       |
| -------------- | ------- | --------------------------------- |
| clientId       | string  | App client ID                     |
| type           | string  | App type (SMARTLINK, SAML2)       |
| title          | string  | App title                         |
| url            | string  | App URL                           |
| iconUrl        | string  | App icon URL                      |
| ping           | integer | How many times the app was opened |
| slug           | string  | Unique slug for the app           |
| description    | string  | App description                   |
| organizationId | integer | Unique ID of the organization     |

### Event

| Field          | type     | description                              |
| -------------- | -------- | ---------------------------------------- |
| id             | integer  | Log event unique ID                      |
| createdAt      | DateTime | Creation date of the log event           |
| message        | string   | Log event message                        |
| type           | integer  | Log event type type                      |
| organizationId | integer  | Unique ID of the organization (nullable) |
| membershipId   | integer  | Unique ID of the membership (nullable)   |
| folderId       | integer  | Unique ID of the folder (nullable)       |
| deviceId       | integer  | Unique ID of the device (nullable)       |
| userId         | integer  | Unique ID of the user (nullable)         |
| appClientId    | string   | Unique client ID of the app (nullable)   |
