import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) =>
    state.blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
  );

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // handleLikeBlog={handleLikeBlog}
          // handleDeleteBlog={handleDeleteBlog}
          creatorIsLoggedIn={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default Blogs;
