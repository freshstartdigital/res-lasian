import { CreateLayoutProps, HomePageLayoutProps, SwmsWithPaths } from '@/types/Layout';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Config } from './config';

import { getServerSession } from 'next-auth';
import { User } from '@/types/coreSchemaTypes';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SWMSTableDataItem, Swms } from '@/types/schema';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
export class Ssr extends Config {
  private context: GetServerSidePropsContext;

  constructor(context: GetServerSidePropsContext) {
    super();
    this.context = context;
  }

  async getHomePageLayoutProps(): Promise<GetServerSidePropsResult<HomePageLayoutProps>> {
    const session = await getServerSession(this.context.req, this.context.res, authOptions);
    console.log('session', session);
    if (!session) {
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          swms: []
        }
      };
    }

    const data = await fetch(`${this.apiUrl}/access/${session.user?.email}/1`);

    if (!data.ok) {
      const res = await data.text();
      console.log('res', res);
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          swms: []
        }
      };
    }

    const res = await data.json();

    const data2 = await fetch(`${this.apiUrl}/swms/organisation/${res.organisation.id}`, {
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!data2.ok) {
      const res2 = await data2.text();
      console.log('res', res2);
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          swms: []
        }
      };
    }

    const res2: Swms[] = await data2.json();

    const swms: SwmsWithPaths[] = [];

    const client = new S3Client({
      region: 'ap-southeast-2'
    });

    if (Array.isArray(res2)) {
      for (const item of res2) {
        if (!item.file_name) {
          continue;
        }
        const command = new GetObjectCommand({
          Bucket: 'reslasian',
          Key: item.file_name
        });

        const url = await getSignedUrl(client, command, { expiresIn: 3600 });

        swms.push({ ...item, url });
      }
    }

    return {
      props: {
        organisation: JSON.parse(JSON.stringify(res.organisation)),
        softwareProduct: JSON.parse(JSON.stringify(res.softwareProduct)),
        accessGranted: res.accessGranted,
        user: JSON.parse(JSON.stringify(session.user as User)),
        swms: JSON.parse(JSON.stringify(swms))
      }
    };
  }
  async getCreateProps(): Promise<GetServerSidePropsResult<CreateLayoutProps>> {
    const session = await getServerSession(this.context.req, this.context.res, authOptions);

    if (!session) {
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          schema: null
        }
      };
    }

    const data = await fetch(`${this.apiUrl}/access/${session.user?.email}/1`);

    if (!data.ok) {
      const res = await data.text();
      console.log('res', res);
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          schema: null
        }
      };
    }

    const res = await data.json();

    const data2 = await fetch(`${this.apiUrl}/swms/schema`, {
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!data2.ok) {
      const res = await data2.text();
      console.log('res', res);
      return {
        props: {
          organisation: null,
          softwareProduct: null,
          accessGranted: false,
          user: null,
          schema: null
        }
      };
    }

    const res2 = await data2.json();
    console.log('res2', res2);

    return {
      props: {
        organisation: JSON.parse(JSON.stringify(res.organisation)),
        softwareProduct: JSON.parse(JSON.stringify(res.softwareProduct)),
        accessGranted: res.accessGranted,
        user: JSON.parse(JSON.stringify(session.user as User)),
        schema: JSON.parse(JSON.stringify(res2))
      }
    };
  }
}
