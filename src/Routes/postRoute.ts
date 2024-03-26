import {Router} from 'express';

import {createPost, deletePost, getPost, getPosts, updatePost} from '../Controller/postController';

const routerPost = Router();

routerPost.post('/createPost', createPost);
routerPost.get('/Post', getPosts);
routerPost.get('/OnePost/:id', getPost);
routerPost.delete('/Post/:id', deletePost);
routerPost.put('/Post/:id', updatePost);

export default routerPost;