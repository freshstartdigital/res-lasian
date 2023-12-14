import { Organisation, SoftwareProduct, User } from "./coreSchemaTypes";

export type HomePageLayoutProps = {
    organisation?: Organisation | null;
    softwareProduct?: SoftwareProduct | null;
    accessGranted?: boolean;
    user?: User | null;

} 
