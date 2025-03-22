import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/people.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-center text-lg p-10">Loading...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500 p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Siva Blog</h1>
          <ul className="flex gap-6 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center py-10">
          <h2 className="text-4xl font-bold mb-4">Welcome to Blog</h2>
          <p className="text-gray-400 text-lg">
            Explore amazing blogs from developers around the world
          </p>
        </section>

        {/* Users Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Authors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400">@{user.username}</p>
                  <p className="text-sm text-gray-300">{user.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Posts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-600 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Published: {post.published_at}
                  </p>
                  <p className="text-sm text-gray-400"> {post.likes} Likes</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Explore Categories</h2>
          <div className="flex gap-4">
            {data.categories.map((category) => (
              <span
                key={category.id}
                className="px-4 py-2 bg-purple-600 text-sm rounded-lg cursor-pointer hover:bg-purple-700"
              >
                {category.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
