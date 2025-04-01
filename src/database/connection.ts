import { ForeignKey, Sequelize } from "sequelize-typescript";
import User from "./models/User";
import Category from "./models/Category";
import Course from "./models/Course";
import Lesson from "./models/Lesson";
import Enrollment from "./models/Enrollment";
import Payment from "./models/Payment";





const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    dialect : 'mysql',
    dialectModule: require("mysql2"),
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT),
    models : [User,Course,Category,Lesson,Enrollment,Payment]
})


sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

sequelize.sync({force:false}).then(()=>{

    
    console.log("synced !!!")
})


//Relationships

Category.hasMany(Course,{foreignKey : 'category'})
Course.belongsTo(Category,{foreignKey: 'category'})

Course.hasMany(Lesson,{foreignKey: "courseId", onDelete: "CASCADE" }) //Auto-delete lessons when a course is deleted
Lesson.belongsTo(Course,{foreignKey: "courseId"})


User.hasMany(Enrollment,{foreignKey : "userId"})
Enrollment.belongsTo(User,{foreignKey : "userId"})

Course.hasMany(Enrollment,{foreignKey : "courseId"})
Enrollment.belongsTo(Course,{foreignKey: "courseId"})

Enrollment.hasMany(Payment,{foreignKey : "enroll_Id"})
Payment.belongsTo(Enrollment,{foreignKey : "enroll_Id"})


// User.hasMany(Payment,{foreignKey: 'userId'})
// Payment.belongsTo(User,{foreignKey : 'userId'})

// Course.hasMany(Payment,{foreignKey: 'courseId'})
// Payment.belongsTo(Course,{foreignKey: 'courseId'})

export default sequelize