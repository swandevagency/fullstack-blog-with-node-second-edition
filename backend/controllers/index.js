const {register} = require('./HomePageMethods/index')
const {login} = require('./HomePageMethods/index')
const {blogPageMountingInfo} = require('./BlogsMethods/index')
const {deleteBlog} = require('./BlogsMethods/index')
const {editBlog} = require('./BlogsMethods/index')
const {createBlog} = require('./BlogsMethods/index')







module.exports = {
    register,
    login,
    blogPageMountingInfo,
    deleteBlog,
    editBlog,
    createBlog
}