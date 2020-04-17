import API from 'goals-todos-api';

//costants
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

//creators
function addGoal(goal) {
    return {
        type: ADD_GOAL,
        goal
    };
}

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

export function handleAddGoal(name, callback) {
    return (dispatch) => {
        return API.saveGoal(name)
            .then((goal) => {
                dispatch(addGoal(goal));
                callback()
            })
            .catch(() => {
                alert("there was an error");
            });
    }
}

export function handleDeleteGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoal(goal.id));
        return API.deleteGoal(goal.id)
            .catch((e) => {
                dispatch(addGoal(goal));
                alert("error in removing the goal");
            })
    }
}

