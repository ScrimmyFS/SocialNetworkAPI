const router = require('express').Router();

const {
    createThought,
    getallThoughts,
    getthoughtbyId,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


router.route('/').get(getallThoughts).post(createThought);

router.route('/:thoughtId')
    .get(getthoughtbyId)
    .put(updateThought)
    .delete(deleteThought);


router.route('/:thoughtId/reactions/:reactionId')
    .post(addReaction)
    .delete(deleteReaction);
    
    
module.exports = router;    
