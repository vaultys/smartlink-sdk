// This file is auto-generated by @hey-api/openapi-ts

export type App = {
    clientId?: string;
    description?: string;
    iconUrl?: string;
    organizationId?: number;
    ping?: number;
    slug?: string;
    title?: string;
    type?: 'CUSTOM_SSO' | 'OPENID' | 'SAML' | 'SMARTLINK';
    url?: string;
};

export type type = 'CUSTOM_SSO' | 'OPENID' | 'SAML' | 'SMARTLINK';

export type Folder = {
    forAllUsers?: boolean;
    id?: number;
    name?: string;
    organizationId?: number;
    parentId?: number;
    path?: string;
};

export type LogEvent = {
    appClientId?: string;
    createdAt?: string;
    deviceId?: number;
    folderId?: number;
    id?: number;
    membershipId?: number;
    message?: string;
    organizationId?: number;
    type?: number;
    userId?: number;
};

export type Membership = {
    Certificates?: Array<{
        connection?: string;
        data?: string;
        id?: number;
        key?: string;
        membershipId?: number;
        metadata?: string;
        organizationId?: number;
        register?: boolean;
        registration?: string;
        started?: string;
        status?: number;
    }>;
    createdAt?: string;
    email?: string;
    firstName?: string;
    id?: number;
    language?: string;
    name?: string;
    organizationId?: number;
    phone?: string;
    registerLink?: string;
    role?: 'ADMIN' | 'OWNER' | 'USER';
    status?: 'ACTIVE' | 'INACTIVE';
    updatedAt?: string;
    userId?: number;
};

export type role = 'ADMIN' | 'OWNER' | 'USER';

export type status = 'ACTIVE' | 'INACTIVE';

export type GetAppByClientIdData = {
    path: {
        clientId: unknown;
    };
};

export type GetAppByClientIdResponse = (App);

export type GetAppByClientIdError = (unknown);

export type PutAppByClientIdData = {
    body: {
        title?: string;
        url?: string;
        iconUrl?: string;
        slug?: string;
        description?: string;
    };
    path: {
        /**
         * The client ID of the app
         */
        clientId: string;
    };
};

export type PutAppByClientIdResponse = (App);

export type PutAppByClientIdError = (unknown);

export type DeleteAppByClientIdData = {
    path: {
        clientId: unknown;
    };
};

export type DeleteAppByClientIdResponse = (App);

export type DeleteAppByClientIdError = (unknown);

export type PostAppData = {
    body: {
        /**
         * The title of the app
         */
        title: string;
        /**
         * The URL of the app
         */
        url?: string;
        /**
         * The icon URL of the app
         */
        iconUrl?: string;
        /**
         * Optional slug for the app
         */
        slug?: string;
        /**
         * The description of the app
         */
        description?: string;
    };
};

export type PostAppResponse = (App);

export type PostAppError = (unknown);

export type GetAppsResponse = (Array<App>);

export type GetAppsError = (unknown);

export type PostAppsData = {
    body: {
        apps?: Array<{
            /**
             * The title of the app
             */
            title?: string;
            /**
             * The URL of the app
             */
            url?: string;
            /**
             * The icon URL of the app
             */
            iconUrl?: string;
            /**
             * Optional slug for the app
             */
            slug?: string;
            /**
             * The description of the app
             */
            description?: string;
        }>;
    };
};

export type PostAppsResponse = (Array<App>);

export type PostAppsError = (unknown);

export type GetEventsData = {
    query?: {
        /**
         * Filter by app client ID
         */
        appClientId?: string;
        /**
         * Filter by device ID
         */
        deviceId?: number;
        /**
         * Filter by folder ID
         */
        folderId?: number;
        /**
         * Start date for filtering events (timestamp)
         */
        fromDate?: number;
        /**
         * Filter by membership ID
         */
        membershipId?: number;
        /**
         * End date for filtering events (timestamp)
         */
        toDate?: number;
        /**
         * Type of log event (APP_OPEN = 0, SMARTLINK_CONNECT = 1, SMARTLINK_CONNECT_FAIL = 2, SMARTLINK_CONNECT_DENIED = 3, SMARTLINK_EXTENSION_CONNECT = 4, SMARTLINK_EXTENSION_CONNECT_FAIL = 5, SMARTLINK_EXTENSION_CONNECT_DENIED = 6, POST_PASSWORD = 7, FORM_BLOCKED = 8)
         */
        type?: number;
        /**
         * Filter by user ID
         */
        userId?: number;
    };
};

export type GetEventsResponse = (Array<LogEvent>);

export type GetEventsError = (unknown);

export type GetFolderByIdData = {
    path: {
        id: unknown;
    };
};

export type GetFolderByIdResponse = (Folder);

export type GetFolderByIdError = (unknown);

export type DeleteFolderByIdData = {
    path: {
        /**
         * The ID of the folder to delete
         */
        id: number;
    };
};

export type DeleteFolderByIdResponse = (Folder);

export type DeleteFolderByIdError = (unknown);

export type PostFolderData = {
    body: {
        name?: string;
        /**
         * ID of the parent folder
         */
        parentId?: number;
    };
};

export type PostFolderResponse = (Folder);

export type PostFolderError = (unknown);

export type GetFoldersResponse = (Array<Folder>);

export type GetFoldersError = (unknown);

export type PostMembershipByIdDeactivateData = {
    path: {
        /**
         * The ID of the membership to deactivate
         */
        id: string;
    };
};

export type PostMembershipByIdDeactivateResponse = (Membership);

export type PostMembershipByIdDeactivateError = (unknown);

export type GetMembershipByIdData = {
    path: {
        id: unknown;
    };
};

export type GetMembershipByIdResponse = (Membership);

export type GetMembershipByIdError = (unknown);

export type PutMembershipByIdData = {
    body: {
        name?: string;
        firstName?: string;
        phone?: string;
        email?: string;
        role?: string;
        language?: string;
        status?: string;
    };
    path: {
        id: unknown;
    };
};

export type PutMembershipByIdResponse = (Membership);

export type PutMembershipByIdError = (unknown);

export type DeleteMembershipByIdData = {
    path: {
        /**
         * The ID of the membership to delete
         */
        id: number;
    };
};

export type DeleteMembershipByIdResponse = (Membership);

export type DeleteMembershipByIdError = (unknown);

export type PostMembershipData = {
    body: {
        name?: string;
        firstName?: string;
        phone?: string;
        email?: string;
        /**
         * Send an email to invite the user to register
         */
        sendMail?: boolean;
        sender?: {
            firstName?: string;
            name?: string;
        };
        /**
         * Set the membership as admin
         */
        isAdmin?: boolean;
    };
};

export type PostMembershipResponse = (Membership);

export type PostMembershipError = (unknown);

export type GetMembershipsResponse = (Array<Membership>);

export type GetMembershipsError = (unknown);

export type PostMembershipsData = {
    body: {
        memberships?: Array<{
            name?: string;
            firstName?: string;
            phone?: string;
            email?: string;
            /**
             * Send an email to invite the user to register
             */
            sendMail?: boolean;
            sender?: {
                firstName?: string;
                name?: string;
            };
            /**
             * Set the membership as admin
             */
            isAdmin?: boolean;
        }>;
    };
};

export type PostMembershipsResponse = (Array<Membership>);

export type PostMembershipsError = (unknown);

export type GetMembershipsSearchData = {
    query: {
        /**
         * Page number for pagination
         */
        page: number;
        /**
         * Number of items per page (default is 10)
         */
        pageSize?: number;
        /**
         * Comma-separated list of roles to filter by (roles are OWNER, ADMIN, USER)
         */
        roles?: string;
        /**
         * Search term in name, first name, email, or phone
         */
        search?: string;
        /**
         * Filter by registration status
         */
        statusFilter?: 'all' | 'registered' | 'unregistered';
    };
};

export type GetMembershipsSearchResponse = ({
    memberships?: Array<Membership>;
    /**
     * Total number of memberships
     */
    count?: number;
});

export type GetMembershipsSearchError = (unknown);