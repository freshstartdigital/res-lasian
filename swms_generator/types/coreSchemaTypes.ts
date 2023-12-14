// verificationToken.ts
export interface VerificationToken {
    identifier: string;
    expires: Date;
    token: string;
}

// accounts.ts
export interface Account {
    id: number;
    userId: number;
    type: string;
    provider: string;
    providerAccountId: string;
    refreshToken?: string;
    accessToken?: string;
    expiresAt?: number;
    idToken?: string;
    scope?: string;
    sessionState?: string;
    tokenType?: string;
}

// sessions.ts
export interface Session {
    id: number;
    userId: number;
    expires: Date;
    sessionToken: string;
}

// users.ts
export interface User {
    id: number;
    name: string;
    email: string;
    emailVerified?: Date;
    image?: string;

}

// organisations.ts
export interface Organisation {
    id: number;
    name: string;
    address?: string;
    contactEmail?: string;
}

// softwareProducts.ts
export interface SoftwareProduct {
    id: number;
    name: string;
    description?: string;
    priceMonthly: number;
    priceAnnually: number;
}

// organisationSubscriptions.ts
export interface OrganisationSubscription {
    id: number;
    organisationId: number;
    softwareProductId: number;
    startDate: Date;
    endDate?: Date;
}

// discountCodes.ts
export interface DiscountCode {
    id: number;
    code: string;
    discountPercentage: number;
    validFrom: Date;
    validUntil: Date;
}

// subscriptionDiscounts.ts
export interface SubscriptionDiscount {
    subscriptionId: number;
    discountCodeId: number;
}

// organisationSoftwareAccess.ts
export interface OrganisationSoftwareAccess {
    organisationId: number;
    softwareProductId: number;
    accessGranted: boolean;
}
