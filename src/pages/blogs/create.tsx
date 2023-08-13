import BlogForm from '@/pages/components/blogs/BlogForm';
import bridg from 'bridg';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {}

const CreateBlogPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const session = useSession();

  return (
    <BlogForm
      onSubmit={async (blog) => {
        const newBlog = await bridg.blog.create({
          data: { ...blog, userId: session.data?.user?.id },
        });
        router.push(`/blogs/${newBlog.id}`);
      }}
    />
  );
};
export default CreateBlogPage;
