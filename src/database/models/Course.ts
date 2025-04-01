import {
    Table,
    Column,
    Model,
    DataType
} from 'sequelize-typescript'

@Table({
    tableName: 'courses',
    modelName: 'Course',
    timestamps: true
})

class Course extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique : true
    })
    declare title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare description: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare price: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare duration: string

   


}

export default Course
