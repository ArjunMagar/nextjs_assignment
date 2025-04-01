import {
    Table,
    Column,
    Model,
    DataType,
    Unique
} from 'sequelize-typescript'

@Table({
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true
})

class Category extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;
    // @Unique
    @Column({
        type: DataType.STRING,
        allowNull : false,
        unique : true
    })
    declare name: string
    @Column({
        type: DataType.STRING,
        allowNull : false,
        
    })
    declare description: string

}

export default Category
