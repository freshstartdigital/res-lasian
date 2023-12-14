import { HomePageLayoutProps } from "@/types/Layout";
import {  GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Config } from "./config";

import { getServerSession } from "next-auth";
import { User } from "@/types/coreSchemaTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export class Ssr extends Config {
    private context: GetServerSidePropsContext

    constructor(context: GetServerSidePropsContext) {
        super()
        this.context = context
    }

    async getHomePageLayoutProps(): Promise<GetServerSidePropsResult<HomePageLayoutProps>> {
      const session = await getServerSession(this.context.req, this.context.res, authOptions)

      if (!session) {
        return {
          props: null,
        }
      }

      const data = await fetch(`${this.apiUrl}/access/${session.user?.email}/`)


        const res = await data.json()

        return {
          props: {
            organisation: JSON.parse(JSON.stringify(res.organisation)),
            softwareProduct: JSON.parse(JSON.stringify(res.softwareProduct)),
            accessGranted: res.accessGranted,
            user: JSON.parse(JSON.stringify(session.user as User)),
          },
        }
    }
}