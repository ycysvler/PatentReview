export const TEST_SET = 'TEST_SET';

export const testSet = () => (dispatch, getState) => {
    dispatch({
        type: TEST_SET
    });
};

const test = (state = {test: "test"}, action) => {
    switch (action.type) {
        case TEST_SET:
            return {
                ...state,
                test: "test1"
            };
        default:
            return state
    }
};

export default test