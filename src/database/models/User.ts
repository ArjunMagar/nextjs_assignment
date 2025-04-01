import {
    Table,
    Column,
    Model,
    DataType
} from 'sequelize-typescript'

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})

class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING
    })
    declare username: string

    @Column({
        type: DataType.ENUM('student','admin'),
        defaultValue: 'student',
        validate: {
            isIn: [['student', 'admin']], // Validate ENUM values
        }
    })

    declare role: string

    @Column({
        type: DataType.STRING
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.STRING
    })
    declare profileImage: string



}

export default User
