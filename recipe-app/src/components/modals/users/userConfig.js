const userConfig = [
    {
        name: 'user_id',
        label: 'User ID',
        type: 'text',
        mapTo: 'id', // Maps to 'id' in initialData
    },
    {
        name: 'first_name',
        label: 'First Name',
        type: 'text',
        mapTo: 'firstName',
    },
    {
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
        mapTo: 'lastName',
    },
    {
        name: 'profile_image_path',
        label: 'Profile Image',
        type: 'file',
        mapTo: 'imagePath' // Maps to 'ImagePath' in initialData
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email', // This will be validated as an email
        mapTo: 'email' // Maps to 'cookingTime' in initialData
    },
    {
        name: 'category',
        label: 'Category',
        type: 'text',
        mapTo: 'category' // Maps to 'stepInstruction' in initialData
    },
    // Additional fields can be added as required
];

export default userConfig;