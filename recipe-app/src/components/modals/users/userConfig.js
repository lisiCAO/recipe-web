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
        type: 'select',
        options: [
            { value: 'user', name: 'User' },
            { value: 'admin', name: 'Admin' },
            { value: 'inactive', name: 'Inactive'},
            { value: 'banned', name: 'Banned'},
            { value: 'deleted', name: 'Deleted'},
        ],
        mapTo: 'category', // Maps to 'stepInstruction' in initialData
        shouldRender: (userData) => {
            // 根据 userData 来决定是否渲染这个字段
            return userData && userData.category !== 'user';
        }
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        mapTo: 'password' // Maps to 'stepInstruction' in initialData
    }
    // Additional fields can be added as required
];

export default userConfig;