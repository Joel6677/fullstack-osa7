import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <table>
            <tbody>
                <tr>
                    <th>Blogs created by user</th>
                </tr>
                {users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Users