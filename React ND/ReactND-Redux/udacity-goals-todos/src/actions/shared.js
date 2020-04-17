import API from 'goals-todos-api';

//constants
export const RECIEVE_DATA = 'RECIEVE_DATA';

//creators
function recieveData(todos, goals) {
    return {
        type: RECIEVE_DATA,
        todos,
        goals
    }
}

export function handleInitialData() {
    return (dispatch) => {
        return Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(recieveData(todos, goals));
        });
    }
}
