import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
  );

  const user = useSelector((state) => state.user);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          creatorIsLoggedIn={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default Blogs;
