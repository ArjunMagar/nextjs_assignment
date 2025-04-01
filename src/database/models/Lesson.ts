import {
    Table,
    Column,
    Model,
    DataType
} from 'sequelize-typescript'

@Table({
    tableName: 'lessons',
    modelName: 'Lesson',
    timestamps: true
})

class Lesson extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare description: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare videoUrl: string
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare createdAt: Date;
    

   


}

export default Lesson
