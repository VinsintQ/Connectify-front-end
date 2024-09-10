import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import projectService from "../../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import postService from "../../services/postService";
import CommentForm from "../commentForm/commentForm";

const PostDetails = ({ user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false); // new state for refresh
  const userId = user._id;

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

  // Fetch post details
  useEffect(() => {
    async function getPost() {
      const postData = await postService.indexc(userId, postId);
      setPost(postData);
    }
    getPost();
  }, [postId, refresh]); // Adding refresh as a dependency to refetch

  const handleCommentAdded = () => {
    // Trigger the refresh to fetch the updated post and comments
    setRefresh((prev) => !prev);
  };

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

      <div className="comments-section">
        <CommentForm
          postId={postId}
          user={user}
          onCommentAdded={handleCommentAdded}
        />

        {post.comments.length === 0 ? (
          <p>There are no comments.</p>
        ) : (
          post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <form action="" id={comment._id}>
                <p>
                  <Link to={`/profile/${comment.userid._id}`}>
                    {" "}
                    {comment.userid.username}
                  </Link>{" "}
                  : {comment.message}
                </p>

                {comment.userid === user.id ? (
                  <button type="submit" className="delete-comment-button">
                    delete
                  </button>
                ) : null}
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetails;
