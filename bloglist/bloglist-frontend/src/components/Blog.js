import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {Form, Button, InputGroup} from 'react-bootstrap'
import {useField} from '../hooks'


const Blog = () => {

  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const comment = useField('text')

  if (!blog) {
    return null
  }

  const own = blog.user.username === user.username

  const handleNewComment = (event) => {
    event.preventDefault()
    console.log(blog)
    console.log(comment.value)
    dispatch(commentBlog(blog.id, comment.value))
    comment.reset()
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`liked ${blog.title}`, 5, 'success'))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      dispatch(setNotification(`removed ${blog.title}`, 5, 'success'))
    }
  }


  return (
    <div className='blog'>
      <div>
        <h1>{blog.title}</h1> by {blog.author}
      </div>

      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      <div>
        <p></p>
        <h3>comments</h3>
        <Form onSubmit={handleNewComment}>
          <InputGroup>
            <Form.Control {...comment}/>
            <InputGroup.Append>
              <Button type="submit">new comment</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
        </ul>
      </div>

    </div>
  )
}


export default Blog