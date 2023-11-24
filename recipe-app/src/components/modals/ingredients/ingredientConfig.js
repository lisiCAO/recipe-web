const ingredientConfig = [
    {
        name: 'ingredient_id',
        label: 'Ingredient ID',
        type: 'text',
        mapTo: 'id', // Maps to 'id' in initialData
    },
    {
        name: 'name',
        label: 'Ingredient Name',
        type: 'text',
        mapTo: 'name' // Maps to 'name' in initialData
    },
    {
        name: 'img_path',
        label: 'Ingredient Image',
        type: 'file',
        mapTo: 'imagePath' // Maps to 'ImagePath' in initialData
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        mapTo: 'description' // Maps to 'stepInstruction' in initialData
    },
    {
        name: 'updated_at',
        label: 'Updated At',
        type: 'date',
        mapTo: 'updatedAt' // Maps to 'stepInstruction' in initialData
    },
    // Additional fields can be added as required
];

export default ingredientConfig;
