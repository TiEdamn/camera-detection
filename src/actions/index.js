import { APP_STATUS, ADD_COORDINATES, RESET_COORDINATES } from './actionTypes';

export const appStatus = () => ({
    type: APP_STATUS
});

export const addCoordinate = coordinate => ({
    type: ADD_COORDINATES,
    payload: coordinate
});

export const resetCoordinates = () => ({
    type: RESET_COORDINATES
});
