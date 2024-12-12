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
  path: {
    clientId: "app_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| clientId   | string | true     |         |

#### Response

> 200: { data: The [App](#app) }

> 401: { error: "Not authorized" }

> 404: { error: "App not found" }

> 500: { error: "Internal server error" }

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

> 200: { data: The added [App](#app) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### putAppByClientId

Updates an app by its client ID.

```typescript
await putAppByClientId({
  path: {
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

> 200: { data: The updated [App](#app) }

> 401: { error: "Not authorized" }

> 404: { error: "App not found" }

> 500: { error: "Internal server error" }

### deleteAppByClientId

Deletes an app by its client ID.

```typescript
await deleteAppByClientId({
  path: {
    clientId: "your_client_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| clientId   | string | true     |         |

#### Response

> 200: { data: The deleted [App](#app) }

> 401: { error: "Not authorized" }

> 404: { error: "App not found" }

> 500: { error: "Internal server error" }

### getApps

Get all apps of your organization.

```typescript
const apps = await getApps();
```

#### Response

> 200: { data: Array of created [Apps](#app) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

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

Array of:

| Parameters  | type   | required | default |
| ----------- | ------ | -------- | ------- |
| title       | string | true     |         |
| url         | string | false    | null    |
| iconUrl     | string | false    | null    |
| description | string | false    | null    |
| slug        | string | false    | null    |

#### Response

> 200: { data: Array of created [Apps](#app) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### getEvents

Retrieve log events with various filters.

```typescript
const events = await getEvents({
  query: {
    fromDate: 1733995830,
    toDate: 1733995840,
    type: 0,
    membershipId: 1,
    folderId: 1,
    userId: 1,
    deviceId: 1,
    appClientId: "1",
  },
});
```

#### Query

| Parameters   | type                      | required | default |
| ------------ | ------------------------- | -------- | ------- |
| fromDate     | integer                   | false    | null    |
| toDate       | integer                   | false    | null    |
| type         | integer (see Events type) | false    | null    |
| membershipId | integer                   | false    | null    |
| folderId     | integer                   | false    | null    |
| userId       | integer                   | false    | null    |
| deviceId     | integer                   | false    | null    |
| appClientId  | string                    | false    | null    |

### Events type

| type | description                                         |
| ---- | --------------------------------------------------- |
| 0    | An app was opened                                   |
| 1    | Someone is successfully connected on SmartLink      |
| 2    | A connection has failed on SmartLink                |
| 3    | A connection was denied on SmartLink                |
| 4    | Someone is successfully connected from an extension |
| 5    | A connection from an extension has failed           |
| 6    | A connection from an extension was denied           |
| 7    | A new password was set                              |
| 8    | A login from was blocked by anti-phishing feature   |

#### Response

> 200: { data: Array of [events](#event) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### getFolderById

Fetches a folder by its ID.

```typescript
await getFolderById({
  path: {
    id: "your_folder_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: { data: The [Folder](#folder) }

> 401: { error: "Not authorized" }

> 404: { error: "Folder not found" }

> 500: { error: "Internal server error" }

### deleteFolderById

Deletes a folder resource identified by the given ID.

```typescript
await deleteFolderById({
  path: {
    id: "your_folder_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: { data: The deleted [Folder](#folder) }

> 401: { error: "Not authorized" }

> 404: { error: "Folder not found" }

> 500: { error: "Internal server error" }

### postFolder

Creates a new folder within your organization.

```typescript
await postFolder({
  body: {
    name: "Folder name",
    parentId: 2,
  },
});
```

#### Body

| Parameters | type    | required | default |
| ---------- | ------- | -------- | ------- |
| name       | string  | true     |         |
| parentId   | integer | false    | null    |

#### Response

> 200: { data: The created [Folder](#folder) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### getFolders

Get all folders of your organization.

```typescript
const folders = await getFolders();
```

#### Response

> 200: { data: Array of [Folder](#folder) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### postMembershipByIdDeactivate

Updates a membership's status to "INACTIVE" by its ID.

```typescript
await postMembershipByIdDeactivate({
  path: {
    id: "your_membership_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: { data: The updated [User](#user) }

> 401: { error: "Not authorized" }

> 404: { error: "User not found" }

> 500: { error: "Internal server error" }

### getMembershipById

Fetches a membership by its ID.

```typescript
await getMembershipById({
  path: {
    id: "your_membership_id",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Response

> 200: { data: The [User](#user) }

> 401: { error: "Not authorized" }

> 404: { error: "User not found" }

> 500: { error: "Internal server error" }

### putMembershipById

Updates a membership by its ID.

```typescript
await putMembershipById({
  path: {
    id: <your_membership_id>,
  },
  body: {
    firstName: "John",
    name: "Doe",
    phone: "+336...",
    email: "john.doe@fake.com",
    role: "ADMIN" | "USER",
    status: "ACTIVE" | "INACTIVE",
    language: "fr",
  },
});
```

#### Parameters

| Parameters | type   | required | default |
| ---------- | ------ | -------- | ------- |
| id         | string | true     |         |

#### Body

| Parameters | type                                  | required | default           |
| ---------- | ------------------------------------- | -------- | ----------------- |
| firstName  | string                                | false    | keep actual value |
| name       | string                                | false    | keep actual value |
| phone      | string                                | false    | keep actual value |
| email      | string                                | false    | keep actual value |
| role       | "ADMIN" or "USER"                     | false    | keep actual value |
| status     | "ACTIVE" or "INACTIVE"                | false    | keep actual value |
| language   | string ("fr", "en", "es", "zh", "de") | false    | keep actual value |

#### Response

> 200: { data: The updated [User](#user) }

> 401: { error: "Not authorized" }

> 404: { error: "User not found" }

> 500: { error: "Internal server error" }

### deleteMembershipById

Deletes a membership resource identified by the given ID.

```typescript
await deleteMembershipById({
  path: {
    id: <your_membership_id>,
  },
});
```

#### Parameters

| Parameters | type    | required | default |
| ---------- | ------- | -------- | ------- |
| id         | integer | true     |         |

#### Response

> 200: { data: The deleted [User](#user) }

> 401: { error: "Not authorized" }

> 404: { error: "User not found" }

> 500: { error: "Internal server error" }

### postMembership

Creates a new membership for your organization.

```typescript
await postMembership({
  body: {
    firstName: "John",
    name: "Doe",
    phone: "+336...",
    email: "john.doe@fake.com",
    sendMail: true, // invite user by email
    sender: {
      // sender will be displayed in the invitation email
      firstName: "Admin",
      name: "istrator",
    },
    isAdmin: false, // administrator membership ?
  },
});
```

#### Body

| Parameters | type                             | required | default |
| ---------- | -------------------------------- | -------- | ------- |
| firstName  | string                           | true     |         |
| name       | string                           | true     |         |
| email      | string                           | true     |         |
| phone      | string                           | true     | null    |
| sendMail   | boolean                          | false    | false   |
| sender     | {firsName: string; name: string} | false    | null    |
| isAdmin    | boolean                          | false    | false   |

#### Response

> 200: { data: The created [User](#user) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### getMemberships

Get all memberships of your organization.

```typescript
const memberships = await getMemberships();
```

#### Response

> 200: { data: Array of [User](#user) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### postMemberships

Creates multiple memberships for your organization.

```typescript
await postMemberships({
  body: [
    {
      firstName: "John",
      name: "Doe",
      phone: "+336...",
      email: "john.doe@fake.com",
      sendMail: true, // invite user by email
      sender: {
        // sender will be displayed in the invitation email
        firstName: "Admin",
        name: "istrator",
      },
      isAdmin: false, // administrator membership ?,
    },
    {
      firstName: "Jane",
      name: "Doe",
      phone: "+336...",
      email: "jane.doe@fake.com",
      sendMail: false,
      isAdmin: true, // administrator membership ?
    },
  ],
});
```

#### Body

Array of:

| Parameters | type                             | required | default |
| ---------- | -------------------------------- | -------- | ------- |
| firstName  | string                           | true     |         |
| name       | string                           | true     |         |
| email      | string                           | true     |         |
| phone      | string                           | true     | null    |
| sendMail   | boolean                          | false    | false   |
| sender     | {firsName: string; name: string} | false    | null    |
| isAdmin    | boolean                          | false    | false   |

#### Response

> 200: { data: Array of created [Users](#user) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

### getMembershipsSearch

Search memberships with various filters. Responses are paginated so you need to specify the page you want.

```typescript
const memberships = await getMembershipsSearch({
  query: {
    page: 1,
    pageSize: 10,
    roles: "ADMIN,USER",
    search: "john", // search in names, firstNames, emails and phones
    statusFilter: "all",
  },
});
```

#### Query

| Parameters   | type                                           | required | default          |
| ------------ | ---------------------------------------------- | -------- | ---------------- |
| page         | integer                                        | true     |                  |
| pageSize     | integer                                        | false    | 10               |
| roles        | string (comma separated )                      | false    | null (all roles) |
| search       | string                                         | false    | null             |
| statusFilter | string ("all", "registered" or "unregistered") | false    | all              |

#### Response

> 200: { data: Array of [User](#user) }

> 401: { error: "Not authorized" }

> 500: { error: "Internal server error" }

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
