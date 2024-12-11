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

Fetches an app by its client ID.

```typescript
await getAppByClientId({
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

| Field       | type   | description     |
| ----------- | ------ | --------------- |
| id          | string | App ID          |
| title       | string | App title       |
| url         | string | App URL         |
| iconUrl     | string | App icon URL    |
| description | string | App description |
| slug        | string | App slug        |

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

| Field       | type   | description     |
| ----------- | ------ | --------------- |
| id          | string | App ID          |
| title       | string | App title       |
| url         | string | App URL         |
| iconUrl     | string | App icon URL    |
| description | string | App description |
| slug        | string | App slug        |

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

| Field       | type   | description     |
| ----------- | ------ | --------------- |
| id          | string | App ID          |
| title       | string | App title       |
| url         | string | App URL         |
| iconUrl     | string | App icon URL    |
| description | string | App description |
| slug        | string | App slug        |

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

| Field | type   | description |
| ----- | ------ | ----------- |
| id    | string | App ID      |

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

| Field | type  | description  |
| ----- | ----- | ------------ |
| apps  | array | List of apps |

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

| Field  | type  | description    |
| ------ | ----- | -------------- |
| events | array | List of events |

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

| Field       | type   | description        |
| ----------- | ------ | ------------------ |
| id          | string | Folder ID          |
| name        | string | Folder name        |
| description | string | Folder description |

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

| Field | type   | description |
| ----- | ------ | ----------- |
| id    | string | Folder ID   |

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

| Field       | type   | description        |
| ----------- | ------ | ------------------ |
| id          | string | Folder ID          |
| name        | string | Folder name        |
| description | string | Folder description |

### getFolders

Get all folders of your organization.

```typescript
const folders = await getFolders();
```

#### Response

| Field   | type  | description     |
| ------- | ----- | --------------- |
| folders | array | List of folders |

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

| Field | type   | description   |
| ----- | ------ | ------------- |
| id    | string | Membership ID |

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

| Field  | type   | description       |
| ------ | ------ | ----------------- |
| id     | string | Membership ID     |
| name   | string | Membership name   |
| status | string | Membership status |

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

| Field  | type   | description       |
| ------ | ------ | ----------------- |
| id     | string | Membership ID     |
| name   | string | Membership name   |
| status | string | Membership status |

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

| Field | type   | description   |
| ----- | ------ | ------------- |
| id    | string | Membership ID |

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

| Field  | type   | description       |
| ------ | ------ | ----------------- |
| id     | string | Membership ID     |
| name   | string | Membership name   |
| status | string | Membership status |

### getMemberships

Get all memberships of your organization.

```typescript
const memberships = await getMemberships();
```

#### Response

| Field       | type  | description         |
| ----------- | ----- | ------------------- |
| memberships | array | List of memberships |

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

| Field       | type  | description         |
| ----------- | ----- | ------------------- |
| memberships | array | List of memberships |

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

| Field       | type  | description         |
| ----------- | ----- | ------------------- |
| memberships | array | List of memberships |
