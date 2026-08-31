import { Link } from "react-router-dom";
import type { Blog } from "../../types/blog";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {blog.category}
          </span>

          {blog.featured && (
            <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs">
              Featured
            </span>
          )}

        </div>

        <h2 className="text-2xl font-bold mt-5">
          {blog.title}
        </h2>

        <p className="mt-4 text-gray-600">
          {blog.excerpt}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mt-6">

          <span>{blog.author}</span>

          <span>{blog.readingTime}</span>

        </div>

        <Link
          to={`/blog/${blog.slug}`}
          className="block mt-6 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-xl font-semibold"
        >
          Read Article
        </Link>

      </div>

    </div>
  );
};

export default BlogCard;