const recipeConfig = [
    {
        name: 'recipe_id',
        label: 'Recipe ID',
        type: 'text',
        mapTo: 'id', // Maps to 'id' in initialData
    },
    {
        name: 'recipe_name',
        label: 'Recipe Name',
        type: 'text',
        mapTo: 'name' // Maps to 'name' in initialData
    },
    {
        name: 'recipe_image_path',
        label: 'Recipe Image',
        type: 'file',
        mapTo: 'imagePath' // Maps to 'ImagePath' in initialData
    },
    {
        name: 'cooking_time',
        label: 'Cooking Time (mins)',
        type: 'number', // Assuming cooking time is a number
        mapTo: 'cookingTime' // Maps to 'cookingTime' in initialData
    },
    {
        name: 'step_instruction',
        label: 'Instructions',
        type: 'textarea',
        mapTo: 'stepInstruction' // Maps to 'stepInstruction' in initialData
    },
    // Additional fields can be added as required
];

export default recipeConfig;
