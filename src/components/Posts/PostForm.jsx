//restaurant form
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EducationService from "../../services/educationService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Services
import postService from "../../services/postService";
const PostForm = ({ user, handleUpdatePost }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { postId } = useParams();

  const userId = user._id;

  const navigate = useNavigate();

  const [PostData, setPostData] = useState({
    content: "",
    image: "",
  });
  const handleAddPost = async ({ formData, userId }) => {
    try {
      const data = await postService.add({ formData, userId });
      return data;
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  };

  const handleChange = (e) => {
    setPostData({ ...PostData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postId) {
      handleUpdatePost({ postId, PostData });
      navigate("/");
    } else {
      if (PostData.content.trim() !== "") {
        handleAddPost({ formData: PostData, userId });
        navigate("/");
      }
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    setError("");

    const base64 = await convertBase64(files);
    setLoading(true);

    axios
      .post("http://localhost:3000/upload", { image: base64 })
      .then((res) => {
        setUrl(res.data.url);
        setPostData({ ...PostData, image: res.data.url });
        setError("");
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 413) {
          setError("The image is too large. Please upload a smaller file.");
        } else {
          setError("An error occurred during the upload. Please try again.");
        }
        console.log(err);
      });
  };

  return (

    <main className="">
      <h1>{postId ? <>Update post</> : <>Add post</>}</h1>

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
          <label htmlFor="confirm">Post Image:</label>
          <input type="file" id="image" name="image" onChange={uploadImage} />
        </div>
        <div>
          <button type="submit">
            {" "}
            {postId ? <>Update</> : <>Create post</>}
          </button>
        </div>
      </form>
    </main>
  );
};

export default PostForm;
