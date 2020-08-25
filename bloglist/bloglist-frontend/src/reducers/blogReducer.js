import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const blogLikes = blogToLike.likes
            const likedBlog = {
                ...blogToLike,
                likes: blogLikes + 1
            }
            return state.map(blog => blog.id !== id ? blog : likedBlog)
        case 'COMMENT':
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case 'REMOVE':
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
            
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type:'NEW_BLOG',
            data: newBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const likeBlog = (blogToLike) => {
    return async dispatch => {
        const likedBlog = {
            ...blogToLike,
            likes: blogToLike.likes + 1,
            user: blogToLike.user.id 
        }

        const updatedBlog = await blogService.update(likedBlog)

        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            data: { id }
        })  
    }
}

export const commentBlog = (id,comment) => {
    return async dispatch => {

        const updatedBlog = await blogService.comment(id, comment)

        dispatch({
            type: 'COMMENT',
            data: updatedBlog
        })
    }
}

export default reducer