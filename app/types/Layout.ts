import { Organisation, SoftwareProduct, User } from "./coreSchemaTypes";

export type HomePageLayoutProps = {
    organisation: Organisation;
    softwareProduct: SoftwareProduct;
    accessGranted: boolean;
    user: User;

} | null
