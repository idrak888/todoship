var initialState = {
    todoModules: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_TODO_MODULES':
            console.log(action.updatedTodoModules);
            return {
                ...state,
                todoModules: action.updatedTodoModules
            }
        default: 
            return state;
    }
}