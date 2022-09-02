import { DataTypes } from 'sequelize'

const Users = (sequelize) => {
    const Schema = {
        first_name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        last_name: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }

    return sequelize.define('users', Schema)
}

export default Users