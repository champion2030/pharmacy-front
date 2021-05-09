import {SET_CHART} from "../actions/types";

const defaultState = {
    requestResult: [],
    diagramInfo: {
        labels: [],
        datasets: [
            {
                label: 'Районы',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
            }
        ]
    }
}

export default function chartTableReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CHART:
            return {
                ...state,
                requestResult: action.payload.requestResult,
                diagramInfo: action.payload.result,
            }
        default:
            return state
    }
}

export const setDiagramInfo = (diagramInfo) => ({type: SET_CHART, payload: diagramInfo})