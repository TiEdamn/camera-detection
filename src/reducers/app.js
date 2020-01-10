import {
    APP_STATUS,
    ADD_COORDINATES,
    RESET_COORDINATES
} from '../actions/actionTypes';

const initialState = {
    status: false,
    coordinates: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_STATUS:
            return {
                ...state,
                status: !state.status
            };
        case ADD_COORDINATES:
            return {
                ...state,
                coordinates: [...state.coordinates, action.payload.coordinate]
            };
        case RESET_COORDINATES:
            return !state.status
                ? state
                : {
                      ...state,
                      coordinates: []
                  };
        default:
            return state;
    }
};
