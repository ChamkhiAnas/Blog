const express = require('express');
const app = express();
const cors = require('cors');


//import routes
const users = require('./routes/users');
const categories = require('./routes/categories')
const comments = require('./routes/comments')
const posts = require('./routes/posts')
const types = require('./routes/types')


const bodyParser = require('body-parser');




app.use(cors());




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json({
    type: 'application/*+json'
}))
app.use(bodyParser.raw({
    type: 'application/vnd.custom-type'
}))
app.use(bodyParser.text({
    type: 'text/html'
}))

//Connection with MySQL
const connection = require('./config/database');

//Models
const Category = require('./models/category');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Tag = require('./models/tag');
const Type = require('./models/type')
const User = require('./models/user');

//Usage of routes
app.use('/categories', categories)
app.use('/comments', comments)
app.use('/users', users)
app.use('/posts', posts)
app.use('/types', types)


User.belongsTo(Type)
Type.hasMany(User)

Post.belongsTo(Category)
Post.belongsTo(User)

Category.hasMany(Post)
User.hasMany(Post)



Comment.belongsTo(User)
Comment.belongsTo(Post)


Post.hasMany(Comment)
User.hasMany(Comment)

//     Users.belongsToMany(models.Groups, {
//       through: 'GroupUsers',
//       as: 'groups',
//       foreignKey: 'userId'
//     });


Post.belongsToMany(Tag, {
    through: 'Post_Tag',
    as: 'items'


})
Tag.belongsToMany(Post, {
    through: 'Post_Tag',
    as: 'items'
})








// Relation between User and Type table
User.belongsTo(Type)
Type.hasMany(User)

// Relation between Post and User table


Post.belongsTo(Category)
Post.belongsTo(User)

// Relation between Category and User table

Category.hasMany(Post)
User.hasMany(Post)

// Relation between Post and USER table
Comment.belongsTo(User)
Comment.belongsTo(Post)

// Relation between post and tag table

Post.hasMany(Comment)
User.hasMany(Comment)


// Relation between user and type table

Post.belongsToMany(Tag, {
    through: 'Post_Tag'
})
Tag.belongsToMany(Post, {
    through: 'Post_Tag'
})

connection.sync()
    .then(result => {

        app.listen(5000, () => console.log('Server ON'))

        // User.create({
        //     name: "anas",
        //     email: "anas@mai.com",
        //     password: "AHAHAH"
        // })
        // Category.create({
        //     title: "ahmed",
        //     active: true,
        // })
        // Comment.create({
        //     commentaire: "Commenatie",
        //     active: true,
        // })
        // Post.create({
        //     title: "hahhaha",
        //     urlImage: "zzzzzzzzzzzzzzzzzzzzzz",
        //     description: "frrrrrrrrrr",
        //     active: true,
        // })

        // Tag.create({
        //     name: "kacch",
        //     active: true,
        // })
        // Type.create({
        //     name: "kakakaka",
        //     active: true,
        // })
    })
    .catch((err) => {
        console.log('error: ', err)
    })