import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
	const { id } = useParams();
	const [ post, setPost ] = useState({
		title: '',
		content: '',
		image: ''
	});
	const navigate = useNavigate();

	useEffect(() => {
		fetch('/api/posts/' + id)
			.then((resp) => resp.json())
			.then((resp) => {
				if (!resp) {
					navigate('/');
					return;
				}

				setPost(resp);
			})
			.catch((error) => {
				console.log(error);
				navigate('/');
			});
	}, []);

	const handleForm = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch('/api/edit/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		})
			.then((resp) => resp.json())
			.then((resp) => console.log(resp));
	};

	return (
		<div className="container">
			<h1>Redaguoti</h1>
			{alert.message && <div className={'alert alert-' + alert.status}>{alert.message}</div>}
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-control">
					<label>Pavadinimas:</label>
					<input type="text" name="title" onChange={(e) => handleForm(e)} value={post.title} />
				</div>

				<div className="form-control">
					<label>Autorius:</label>
					<input type="text" name="author" onChange={(e) => handleForm(e)} value={post.author} />
				</div>

				<div className="form-control">
					<label>Knygos ISBN:</label>
					<input type="text" name="isbn" onChange={(e) => handleForm(e)} value={post.isbn} />
				</div>

				<div className="form-control">
					<label>Virselis:</label>
					<input type="text" name="image" onChange={(e) => handleForm(e)} value={post.image} />
				</div>

				<div className="form-control">
					<label>Virselio autorius:</label>
					<input type="text" name="cover_author" onChange={(e) => handleForm(e)} value={post.cover_author} />
				</div>

				<button className="btn btn-primary">Siųsti</button>
			</form>
		</div>
	);
};

export default EditPost;
