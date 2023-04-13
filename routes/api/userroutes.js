const router = require('express').Router();

const {
    getallUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController');

router.route('/')
    .get(getallUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    
router.route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;
    
