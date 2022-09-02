import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {
	const { loggedIn } = props;
	const [ posts, setPosts ] = useState([]);
	const [ alert, setAlert ] = useState({
		message: '',
		status: ''
	});
	const [ refresh, setRefresh ] = useState(false);

	useEffect(
		() => {
			axios
				.get('/api/posts/')
				.then((resp) => {
					setPosts(resp.data);
				})
				.catch((error) => {
					setAlert({
						message: error.response.data,
						status: 'danger'
					});
				});
		},
		[ refresh ]
	);

	const handleDelete = (id) => {
		if (isNaN(id) || !loggedIn) return;

		fetch('/api/posts/delete/' + id, {
			method: 'DELETE'
		})
			.then((resp) => resp.json())
			.then((resp) => {
				setAlert({
					message: resp.message,
					status: 'success'
				});
				setRefresh(!refresh);
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.log(error);
				setAlert({
					message: 'Įvyko serverio klaida',
					status: 'danger'
				});
				window.scrollTo(0, 0);
			})
			.finally(() => {
				setTimeout(
					() =>
						setAlert({
							message: '',
							status: ''
						}),
					3000
				);
			});
	};

	return (
		<div className="container">
			{alert.message && <div className={'alert alert-' + alert.status}>{alert.message}</div>}
			<div className="articles">
				{posts.length > 0 &&
					posts.map((book) => {
						return (
							<div key={book.id} className="box">
								<div className="image">
									<Link to={'/post/' + book.id}>
										<img src={book.image} alt={book.title} />
									</Link>
								</div>

								<Link to={'/post/' + book.id} className="article-link">
									<h3>{book.title}</h3>
								</Link>

								{loggedIn && (
									<div className="controls">
										<Link to={'/post/' + book.id} className="btn btn-success">
											Skaityti plačiau
										</Link>
										<Link to={'/edit/' + book.id} className="btn btn-primary">
											Redaguoti
										</Link>
										<button onClick={() => handleDelete(book.id)} className="btn btn-danger">
											Trinti
										</button>
									</div>
								)}

                
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Home;
