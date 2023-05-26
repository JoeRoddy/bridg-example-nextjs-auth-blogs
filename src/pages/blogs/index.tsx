import { Blog } from '@prisma/client';
import db from 'bridg';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import BlogList from '@/pages/components/blogs/BlogList';

interface Props {}

const Blogs: NextPage<Props> = ({}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      const blogs = await db.blog.findMany({ where: { published: true } });
      setBlogs(blogs);
    })();
  }, []);

  return (
    <div>
      <h2>All Blogs:</h2>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;
