import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from 'bridg';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {}

const Name: NextPage<Props> = ({}) => {
  const [data, setData] = useState({});
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await db.user.findMany({ include: { blogs: true } });
      setData(data);
    })();
  }, []);

  return (
    <div className="">
      <p className=""></p>

      <pre>{JSON.stringify(data, null, 1)}</pre>
    </div>
  );
};
export default Name;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {},
  };
}
