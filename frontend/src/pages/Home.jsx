import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchResources = async () => {
    try {
      const res = await API.get(
        `/resources?page=${page}&limit=10&search=${search}&category=${category}`
      );

      setResources(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [page, search, category]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">DevList</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="flex-1 p-2 border rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="p-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="react">React</option>
          <option value="javascript">JavaScript</option>
          <option value="webdev">WebDev</option>
          <option value="programming">Programming</option>
        </select>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {resources.length === 0 ? (
          <p className="text-center text-gray-500">No resources found.</p>
        ) : (
          resources.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {item.category}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;