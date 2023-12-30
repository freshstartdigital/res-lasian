import { Organisation, SoftwareProduct, User } from './coreSchemaTypes';
import { SWMSTableDataItem, Swms } from './schema';

export type HomePageLayoutProps = {
  organisation?: Organisation | null;
  softwareProduct?: SoftwareProduct | null;
  accessGranted?: boolean;
  user?: User | null;
  swms: Swms[];
};

export type CreateLayoutProps = {
  organisation?: Organisation | null;
  softwareProduct?: SoftwareProduct | null;
  accessGranted?: boolean;
  user?: User | null;
  schema: SWMSTableDataItem[] | null;
};
