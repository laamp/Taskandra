import {
    RECEIVE_PROJECT_TASKS,
    RECEIVE_INBOX_TASKS,
    RECEIVE_NEW_TASK,
    CLEAR_TASKS
} from '../actions/tasksActions';

const initialState = {
    tasks: {},
    inboxTasks: {}
};

export default function (state = initialState, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PROJECT_TASKS:
            return {
                inboxTasks: state.inboxTasks,
                tasks: action.tasks.data
            };
        case RECEIVE_INBOX_TASKS:
            return {
                tasks: state.tasks,
                inboxTasks: action.tasks.data
            };
        case RECEIVE_NEW_TASK:
            // this happens when task is part of a project
            if (Object.values(action.task.data)[0].project) {
                let newTasks = Object.assign({}, state.tasks, action.task.data);
                return { tasks: newTasks, inboxTasks: state.inboxTasks };
            }

            // otherwise it must be an inbox task
            let newInboxTasks = Object.assign({}, state.inboxTasks, action.task.data);
            return { tasks: state.tasks, inboxTasks: newInboxTasks };
        case CLEAR_TASKS:
            return initialState;
        default:
            return state;
    }
}
