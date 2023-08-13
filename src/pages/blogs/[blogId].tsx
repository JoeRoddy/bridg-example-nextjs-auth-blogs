import { Blog, User } from '@prisma/client';
import bridg from 'bridg';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {}

const BlogPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const session = useSession();
  const blogId = router.query.blogId as string;
  const [blog, setBlog] = useState<Blog & { user: User | null }>();

  useEffect(() => {
    if (!blogId) return;
    (async () => {
      const blog = await bridg.blog.findUnique({ where: { id: blogId }, include: { user: true } });
      if (!blog) return router.push('/404');
      setBlog(blog);
    })();
  }, [blogId]);

  if (!blog) return <p>loading..</p>;

  return (
    <div>
      <h3>{blog.title}</h3>
      <i>{!blog.published && 'Not'} Published</i>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {blog.user && (
          <>
            Author:
            {blog.user.image && <img style={{ height: 30, width: 30, borderRadius: 15 }} src={blog.user.image} />}
            <a href={`/blogs/user/${blog.user.id}`}>{blog.user.name}</a>
          </>
        )}
      </div>
      <p>{blog.body}</p>
      {blog.userId === session.data?.user?.id && (
        <>
          <button onClick={() => router.push(`/blogs/edit/${blogId}`)}>Edit</button>
          <button
            onClick={async () => {
              await bridg.blog.delete({ where: { id: blogId } });
              router.push('/blogs');
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BlogPage;
