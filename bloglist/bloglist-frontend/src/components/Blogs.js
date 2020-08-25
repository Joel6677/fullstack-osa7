import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'


const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <Table striped>
            <tbody>
                {blogs.sort(byLikes).map(blog =>
                    <tr key={blog.id}>
                        <td>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                    </tr>)}
            </tbody>
        </Table>
    )
}

export default Blogs