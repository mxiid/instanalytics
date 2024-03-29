// Import necessary Redux functions and constants
import { combineReducers } from 'redux';

// Define your initial state
const initialState = {
    fileName: '', // Define initial fileName state property
};

// Define your reducers
const fileNameReducer = (state = initialState.fileName, action) => {
    switch (action.type) {
        case 'SET_FILE_NAME':
            return action.payload; // Update the fileName property directly
        default:
            return state; // Return the current state by default
    }
};

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
    fileName: fileNameReducer, // Add more reducers here if needed
});

export default rootReducer;
