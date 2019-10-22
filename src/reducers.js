export default function play(state = {}, action) {
    let newState = {}
    switch (action.type) {
        case "NEW_GRID":
            newState = { ...state, grid: action.grid };
            break;
        default:
            return state;
    }
    return newState;
}