import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import postService from "../../services/postService";
import CommentForm from "../commentForm/commentForm";
import "./postDetail.css";

const PostDetails = ({ user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const userId = user._id;

  
  const deletePost = () => {
    setShowPostModal(true);
  };

 
  const handlePostModalClose = () => {
    setShowPostModal(false);
  };


  const handleConfirmDeletePost = async () => {
    await postService.deleter(userId, postId);
    window.location.replace("/");
  };

  
  const deleteComment = (commentId) => {
    setCommentToDelete(commentId); 
    setShowCommentModal(true);
  };


  const handleCommentModalClose = () => {
    setShowCommentModal(false);
    setCommentToDelete(null); 
  };

  
  const handleConfirmDeleteComment = async () => {
    if (commentToDelete) {
      await postService.deleteComment(userId, postId, commentToDelete);
      setRefresh((prev) => !prev); 
      handleCommentModalClose(); 
    }
  };

 
  useEffect(() => {
    async function getPost() {
      const postData = await postService.indexc(userId, postId);
      setPost(postData);
    }
    getPost();
  }, [postId, refresh]);

  const handleCommentAdded = () => {
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
    <div className="post-details-container">
      <div className="user-profile">
        <Link to={`/profile/${post.userId._id}`}>
          <img src={post.userId?.image} alt="User profile photo" />
          {post.userId.username}
        </Link>
      </div>

      <img src={post?.image} alt="post image" className="posty-image" />
      <p className="post-content">Content: {post?.content}</p>

      {post.userId._id === user._id && (
        <>
          <button>
            <Link to={`/post/${postId}/update`}>Edit</Link>
          </button>
          <button onClick={deletePost}>Delete</button>
        </>
      )}

      <Modal show={showPostModal} onHide={handlePostModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePostModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDeletePost}>
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
                    <img src={comment.userid?.image} alt="User profile photo" />
                    {comment.userid.username}
                  </Link>
                  : {comment.message}
                </p>
                {comment.userid._id === user._id && (
                  <button
                    type="button"
                    className="delete-comment-button"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </form>
            </div>
          ))
        )}
      </div>

      <Modal show={showCommentModal} onHide={handleCommentModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCommentModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteComment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostDetails;
