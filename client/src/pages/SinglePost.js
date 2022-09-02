import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SinglePost = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/posts/' + id)
        .then(resp => resp.json())
        .then(resp => {
            if(!resp) {
            
                navigate('/')
                return 
            }

            setPost(resp)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    return (
        <div className="container">
			<div className="single-post">
				<div className="image">
					<img src={post.image} alt={post.title} />
				</div>
				<h3>{post.title}</h3>
				<h5>Autorius: {post.author}</h5>
				<p>ISBN: {post.isbn}</p>
				<p>Virselio autorius: {post.cover_author}</p>
			</div>
		</div>
    ) 
}

export default SinglePost