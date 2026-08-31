import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { blogs } from "../../data/mock/blogs";

const BlogDetails = () => {
  const { slug } = useParams();

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="py-24 text-center text-2xl font-semibold">
        Blog not found.
      </div>
    );
  }

  const relatedBlogs = blogs
    .filter(
      (item) =>
        item.id !== blog.id &&
        item.category === blog.category
    )
    .slice(0, 3);

  return (
    <section className="bg-slate-50 py-20">
      <Container>

        {/* Hero */}

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[500px] rounded-3xl object-cover shadow-lg"
        />

        {/* Header */}

        <div className="mt-10">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            {blog.category}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-6 mt-5 text-gray-600">

            <span>✍ {blog.author}</span>

            <span>📅 {blog.publishedDate}</span>

            <span>⏱ {blog.readingTime}</span>

          </div>

        </div>

        {/* Content */}

        <div className="mt-12 bg-white rounded-3xl shadow-lg p-10">

          <p className="text-lg leading-9 whitespace-pre-line text-gray-700">
            {blog.content}
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10">

          <Link
            to="/blog"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
          >
            ← Back to Blogs
          </Link>

        </div>

        {/* Related */}

        {relatedBlogs.length > 0 && (

          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {relatedBlogs.map((item) => (

                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-3">
                      {item.excerpt}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        )}

      </Container>
    </section>
  );
};

export default BlogDetails;