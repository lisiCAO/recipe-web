const reviewConfig = [
    {
        name: 'review_id',
        label: 'Review ID',
        type: 'text',
        mapTo: 'id', // Maps to 'id' in initialData
    },
    {
        name: 'recipe_name',
        label: 'Recipe Name',
        type: 'text',
        mapTo: 'recipeName' // Maps to 'name' in initialData
    },
    {
        name: 'userName',
        label: 'User Name',
        type: 'text', // Assuming cooking time is a number
        mapTo: 'user_name' // Maps to 'cookingTime' in initialData
    },
    {
        name: 'comment',
        label: 'Comment',
        type: 'textarea',
        mapTo: 'comment' // Maps to 'stepInstruction' in initialData
    },
    {
        name: 'rating',
        label: 'Rating',
        type: 'number',
        mapTo: 'rating' // Maps to 'stepInstruction' in initialData
    },
    {
        name: 'createdAt',
        label: 'Created At',
        type: 'number',
        mapTo: 'created_at' // Maps to 'stepInstruction' in initialData
    },
    // Additional fields can be added as required
];

export default reviewConfig;
