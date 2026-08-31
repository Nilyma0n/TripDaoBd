import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import BlogCard from "../../components/blog/BlogCard";
import { blogs } from "../../data/mock/blogs";

const categories = [
  "All",
  "Travel Guide",
  "Food",
  "Adventure",
  "Culture",
  "Safety",
  "Tips",
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || blog.category === category;

      const matchesFeatured =
        !featuredOnly || blog.featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFeatured
      );
    });
  }, [search, category, featuredOnly]);

  const totalPages = Math.ceil(
    filteredBlogs.length / itemsPerPage
  );

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-slate-50 min-h-screen py-20">
      <Container>

        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-blue-700 font-semibold uppercase tracking-widest">
            Travel Blog
          </span>

          <h1 className="text-5xl font-extrabold mt-4">
            Travel Stories & Guides
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Discover travel guides, local culture, food,
            adventure and useful travel tips across Bangladesh.
          </p>

        </div>

        {/* Filters */}

        <div className="mt-14 bg-white rounded-3xl shadow-md p-8">

          <div className="grid lg:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl p-4"
            />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl p-4"
            >
              {categories.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-3 text-lg font-medium">

              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => {
                  setFeaturedOnly(e.target.checked);
                  setCurrentPage(1);
                }}
              />

              Featured Only

            </label>

          </div>

        </div>

        {/* Results */}

        <div className="mt-8 text-gray-600 font-medium">
          {filteredBlogs.length} article(s) found
        </div>

        {/* Blog Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          {currentBlogs.map((blog) => (

            <BlogCard
              key={blog.id}
              blog={blog}
            />

          ))}

        </div>

        {/* Pagination */}

        {totalPages > 1 && (

          <div className="flex justify-center gap-3 mt-14 flex-wrap">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="px-5 py-3 rounded-xl bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-12 h-12 rounded-xl ${
                    currentPage === index + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="px-5 py-3 rounded-xl bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>

          </div>

        )}

      </Container>
    </section>
  );
};

export default Blog;