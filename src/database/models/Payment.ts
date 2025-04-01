import {
    Table,
    Column,
    Model,
    DataType
} from 'sequelize-typescript'

@Table({
    tableName: 'payments',
    modelName: 'Payment',
    timestamps: true
})

class Payment extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare amount: number

    @Column({
        type: DataType.ENUM('Paid', 'Unpaid', 'Failed'),
        defaultValue: 'Unpaid',
        validate: {
            isIn: [['Paid', 'Unpaid', 'Failed']], // Validate ENUM values
        }
    })

    declare status: string

    @Column({
        type: DataType.ENUM('esewa', 'khalti'),
        allowNull: false,
        validate: {
            isIn: [['esewa', 'khalti']], // Validate ENUM values
        }
    })
    declare paymentMethod: string

    @Column({
        type: DataType.STRING,
        allowNull: false

    })
    declare pidx: string



}

export default Payment
