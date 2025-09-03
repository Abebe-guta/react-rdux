import{ createSlice,nanoid } from "@reduxjs/toolkit";
import {sub} from 'date-fns';

const initialState=[
{id:'1', 
    title:'Learning Redux Toolkit',
     content:'I have heard good things about it...',
    date:sub(new Date(),{minutes:10}).toISOString(),
    reactions:{
        thumbsUp:0,
        wow:0,
        heart:0,
        rocket:0,
        coffee:0}
    },
{id:'2', 
    title:'Understanding React', 
    content:'React is a JavaScript library for building user interfaces.', 
    date:sub(new Date(),{minutes:5}).toISOString(),
    reactions:{
        thumbsUp:0,
        wow:0,
        heart:0,
        rocket:0,
        coffee:0}
},
{id:'3',
     title:'Slice......', 
     content:'JavaScript is a versatile programming language.', 
    date:sub(new Date(),{minutes:2}).toISOString(),
    reactions:{
        thumbsUp:0,
        wow:0,
        heart:0,
        rocket:0,
        coffee:0}
}
]
const postsSlice=createSlice({
name:'posts',
initialState,
reducers:{
    postAdded:{
        reducer(state,action){
        state.push(action.payload);
    
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
    const existingPost = state.find(post=>post.id===postId);
    if(existingPost){
        existingPost.reactions[reaction]++;
    }
}

}
})

 export const selectAllPosts=(state)=>state.posts;

 //export action creators
 export const { postAdded, reactionsAdded } = postsSlice.actions;

 export default postsSlice.reducer;
