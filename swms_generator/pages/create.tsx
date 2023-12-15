import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { GetServerSideProps, NextPage } from 'next';
import { HomePageLayoutProps } from '@/types/Layout';
import { Ssr } from '@/lib/Ssr';
import Unauthenticated from '@/layout/Unauthenticated';
import CreateLayout from '@/layout/CreateLayout';

const inter = Inter({ subsets: ['latin'] });

const Create: NextPage<HomePageLayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>SWMS Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.user ? <CreateLayout {...props} /> : <Unauthenticated />}
    </>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps<HomePageLayoutProps> = async (ctx) => {
  return await new Ssr(ctx).getHomePageLayoutProps();
};
