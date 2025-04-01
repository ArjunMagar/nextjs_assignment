import {
    Table,
    Column,
    Model,
    DataType
} from 'sequelize-typescript'

@Table({
    tableName: 'enrollments',
    modelName: 'Enrollment',
    timestamps: true
})

class Enrollment extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare enrolledAt: Date;

    @Column({
        type: DataType.ENUM('Approve', 'Reject', 'Pending'),
        defaultValue: 'Pending',
        validate: {
            isIn: [['Approve', 'Reject', 'Pending']], // Validate ENUM values
        }
    })
    declare enrollmentStatus: string
    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    declare whatsapp: string

}

export default Enrollment
