import{ createSlice,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import {sub} from 'date-fns';
import axios from "axios";


const POST_URL='https://jsonplaceholder.typicode.com/posts'
const initialState={
    posts:[],
    status:'idle' ,// 'idle' | 'loading' | 'succeeded' | 'failed'
    error:null
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(POST_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost, { rejectWithValue }) => {
    try {
        const response = await axios.post(POST_URL, newPost);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const postsSlice=createSlice({
name:'posts',
initialState,
reducers:{
    postAdded:{
        reducer(state,action){
        state.posts.push(action.payload);
    
    },
    prepare(title,content,userId){
        return {
            payload:{
                id:nanoid(),
                title,
                content,
                date:new Date().toISOString(),
                reactions:{
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                },
                userId
            }
        }
    }
},
reactionsAdded(state,action){
    const {postId,reaction} = action.payload;
    const existingPost = state.posts.find(post=>post.id===postId);
    if(existingPost){
        existingPost.reactions[reaction]++;
    }
}

},
extraReducers: (builder) => {
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
    state.status = 'succeeded';
    let min = 1;
    const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        };
        post.userId = post.userId.toString(); // Fix type mismatch
        return post;
    });
    state.posts = loadedPosts; // Avoid duplicate posts
})

        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = action.payload.userId.toString();
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            };
            console.log(action.payload);
            state.posts.push(action.payload);
        });
}
})

 export const selectAllPosts=(state)=>state.posts.posts;   
  export const getPostStatus=(state)=>state.posts.status; 
   export const getPostsError=(state)=>state.posts.error;    
   
 

 //export action creators
 export const { postAdded, reactionsAdded } = postsSlice.actions;

 export default postsSlice.reducer;

