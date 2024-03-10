import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  post: {},
  error: null,
  hasMore: true,
  isEdit: false,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.post.DATA_FETCHED: {
      const newPosts = action.data.blogs.filter(
        (blog) => !state.posts.some((post) => post.id === blog.id)
      );
      const total = action?.data?.page * action?.data?.limit;
      const hasMore = action?.data?.total > total;
      return {
        ...state,
        posts: [...state.posts, ...newPosts],
        loading: false,
        hasMore,
      };
    }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.POST_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((item) => item.id !== action.data),
      };
    }

    case actions.post.POST_EDITING: {
      console.log(action);
      return {
        ...state,
        loading: false,
        isEdit: true,
        post: action.data,
      };
    }

    case actions.post.DATA_EDITED: {
      console.log(action);

      return {
        ...state,
        isEdit: false,
      };
    }
  }
};

export { initialState, postReducer };
