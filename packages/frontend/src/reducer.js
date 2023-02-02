export const reducer = (state, { type, value }) => {
    switch (type) {
        case 'openDrawer':
            return {
                ...state,
                open: true,
            };
        case 'closeDrawer':
            return {
                ...state,
                open: false,
            };
        case 'setRent':
            return {
                ...state,
                rent: value,
            };
        case 'setMapLayers':
            return {
                ...state,
                mapLayers: value,
            };
        case 'setPolygonPoints':
            return {
                ...state,
                polygonPoints: value,
            };
        case 'setPropertiesInScope':
            return {
                ...state,
                propertiesInScope: value,
            };
        case 'setActiveProperty':
            return {
                ...state,
                activeProperty: value,
            };
        default:
            return state;
    }
};

export const initialState = {
    open: true,
    rent: [0, 2000],
    mapLayers: [],
    polygonPoints: [],
    propertiesInScope: [],
    activeProperty: null,
};
