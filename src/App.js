import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';


const CREATE_POST = 'CREATE_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';


const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';


const createPost = (post) => ({
  type: CREATE_POST,
  payload: post
});

const updatePost = (postId, updatedPost) => ({
  type: UPDATE_POST,
  payload: { postId, updatedPost }
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
});


const createUser = (user) => ({
  type: CREATE_USER,
  payload: user
});

const updateUser = (userId, updatedUser) => ({
  type: UPDATE_USER,
  payload: { userId, updatedUser }
});

const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId
});


const postReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case UPDATE_POST:
      return state.map(post =>
        post.id === action.payload.postId ? action.payload.updatedPost : post
      );
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};


const userReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.payload];
    case UPDATE_USER:
      return state.map(user =>
        user.id === action.payload.userId ? action.payload.updatedUser : user
      );
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer
});


const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Posts />
      <Users />
    </Provider>
  );
};


const Posts = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    const newPost = { id: Date.now(), title: 'New Post' };
    dispatch(createPost(newPost));
  };

  const handleUpdatePost = (postId) => {
    const updatedPost = { id: postId, title: 'Updated Post' };
    dispatch(updatePost(postId, updatedPost));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={handleCreatePost}>Create Post</button>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => handleUpdatePost(post.id)}>Update</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleCreateUser = () => {
    const newUser = { id: Date.now(), name: 'New User' };
    dispatch(createUser(newUser));
  };

  const handleUpdateUser = (userId) => {
    const updatedUser = { id: userId, name: 'Updated User' };
    dispatch(updateUser(userId, updatedUser));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleCreateUser}>Create User</button>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <button onClick={() => handleUpdateUser(user.id)}>Update</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
