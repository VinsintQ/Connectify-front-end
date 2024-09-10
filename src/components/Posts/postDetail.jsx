import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import projectService from "../../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import postService from "../../services/postService";

const postDetails = ({ user }) => {

  const { postId } = useParams();
  ;
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const userId=user._id;

  // Handle opening the modal
  const deletePost = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = async () => {
    await postService.deleter(userId, postId);
    window.location.replace("/");
  };

  useEffect(() => {
    async function getPost() {
      const postData = await postService.indexc( userId, postId );
      setPost(postData);
    }
    getPost();
  }, [postId]);

  if (!post) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <div>
      <h3>Post Details</h3>
      <img src={post?.image} alt="" />
      <p>content: {post?.content}</p>
      
   {post.userId === user._id && (
        <>
          <button>
            <Link to={`/post/${postId}/update`}>Edit</Link>
          </button>
          <button onClick={deletePost}>Delete</button>
        </>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default postDetails;
