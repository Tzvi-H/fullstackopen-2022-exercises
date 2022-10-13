// import Blog from "./Blog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
  );

  // const user = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => (
        // <Blog
        //   key={blog.id}
        //   blog={blog}
        //   creatorIsLoggedIn={user.username === blog.user.username}
        // />
        <div key={blog.id} style={blogStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}: {blog.author}{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
