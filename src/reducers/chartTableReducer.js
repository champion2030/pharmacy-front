import {SET_3D_CHART, SET_CHART} from "../actions/types";

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
    },
    category: [],
    dataset: []

}

export default function chartTableReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CHART:
            return {
                ...state,
                requestResult: action.payload.requestResult,
                diagramInfo: action.payload.result,
            }
        case SET_3D_CHART:
            return {
                ...state,
                category: action.payload.category,
                dataset: action.payload.dataset,
            }
        default:
            return state
    }
}

export const setDiagramInfo = (diagramInfo) => ({
    type: SET_CHART,
    payload: diagramInfo
})

export const set3DDiagram = (diagram3D) => ({
    type: SET_3D_CHART,
    payload: diagram3D
})