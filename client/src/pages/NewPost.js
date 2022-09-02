import { useState } from 'react'

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: '',
		author: '',
		isbn: '',
		cover_author: '',
		image: ''
    })

    const handleForm = (e) => {
        setPostForm({...postForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postForm)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))

    }

    return (
        <div className="container">
			<h1>Naujas irasas</h1>
			
			{alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}

			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-control">
					<label>Pavadinimas:</label>
					<input type="text" name="title" onChange={(e) => handleForm(e)} />
				</div>

				<div className="form-control">
					<label>Autorius: </label>
					<input type="text" name="author" onChange={(e) => handleForm(e)} />
				</div>

				<div className="form-control">
					<label>Knygos ISBN: </label>
					<input type="text" name="isbn" onChange={(e) => handleForm(e)} />
				</div>

				<div className="form-control">
					<label>Nuotrauka: </label>
					<input type="text" name="image" onChange={(e) => handleForm(e)} />
				</div>

				<div className="form-control">
					<label>Virselio autorius: </label>
					<input type="text" name="cover_author" onChange={(e) => handleForm(e)} />
				</div>

				<button className="btn btn-primary">Siųsti</button>
			</form>
		</div>
    )
}

export default NewPost