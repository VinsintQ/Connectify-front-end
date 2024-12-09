const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload._id;
};

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const allposts = async (userId) => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/allposts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const indexc = async (userId, postId) => {
  try {
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/post/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const add = async ({ formData, userId }) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const deleter = async (userId, postId) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await fetch(`${BASE_URL}/${userId}/post/${postId}`, options);

  return res.json();
};

const update = async ({ postId, PostData, user }) => {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(PostData),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (userId, postId, formData) => {
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(
      `${BASE_URL}/${userId}/post/${postId}/comment`,
      data
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (userId, postId, commentId) => {
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(
      `${BASE_URL}/${userId}/post/${postId}/comment/${commentId}`,
      data
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const like = async (userId, postId) => {
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(`${BASE_URL}/${userId}/post/${postId}/like`, data);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const dislike = async (userId, postId) => {
  try {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(
      `${BASE_URL}/${userId}/post/${postId}/dislike`,
      data
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const rmLike = async (userId, postId, likeId) => {
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(
      `${BASE_URL}/${userId}/post/${postId}/like/${likeId}`,
      data
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const rmDislike = async (userId, postId, dislikeId) => {
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await fetch(
      `${BASE_URL}/${userId}/post/${postId}/dislike/${dislikeId}`,
      data
    );

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default {
  allposts,
  add,
  update,
  indexc,
  deleter,
  createComment,
  deleteComment,
  like,
  dislike,
  rmLike,
  rmDislike,
};
