
//restaurant form
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EducationService from "../../services/educationService";
import { useNavigate } from "react-router-dom";

//Services
import postService from "../../services/postService";
const PostForm = ({ user }) => {
  const userId = user._id;

  const navigate = useNavigate();

  const [PostData, setPostData] = useState({
    
    content:"",


  })
const handleAddPost = async ({ formData, userId }) => {
    try {
      const data = await postService.add({ formData, userId });
      return data;
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  }








  const handleChange = (e) => {
    setPostData({ ...PostData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (PostData.content.trim() !== "" ) {
      handleAddPost({ formData: PostData, userId });
      navigate("/");
    }
  };

  return (
    <main className="">
      <h1>Add post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Message : </label>
          <input
            type="content"
            id="content"
            value={PostData.content}
            name="content"
            onChange={handleChange}
          />
        </div>
    
        <div>
          <button type="submit">
            Create Post
          </button>
        </div>
      </form>
    </main>
  );
};

export default PostForm;
