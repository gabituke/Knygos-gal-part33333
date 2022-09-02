import { DataTypes } from 'sequelize';

const Posts = (sequelize) => {
	const Schema = {
		title: {
			type: DataTypes.STRING, 
			allowNull: false 
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cover_author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isbn: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false
		}
	};

	return sequelize.define('posts', Schema);
};

export default Posts;