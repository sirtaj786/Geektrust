import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_LOADING, PRODUCT_SEARCH, PRODUCT_SUCESS } from "./product.action.type"

const initData = {
    fetchedData: [],
    loading: false,
    error: false,
    filterData: [],
}
export const productReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case PRODUCT_LOADING: return { ...state, loading: true }
        case PRODUCT_SUCESS: return { ...state, fetchedData: [...payload], filterData: [...payload], error: false, loading: false }
        case PRODUCT_ERROR: return { ...state, loading: false, error: true }
        case PRODUCT_FILTER: return { ...state, filterData: [...filterHandler(state.fetchedData, payload)] }
        case PRODUCT_SEARCH: return { ...state, filterData: [...searchDataHandler(state.fetchedData, payload)] }
        default: return state
    }

}

const filterHandler = (data, selectedValues) => {
    let result = data.filter((el) => {
        if (selectedValues.includes(el.color)) {
            return el
        }
        else if (selectedValues.includes(el.gender)) {
            return el
        }
        else if (selectedValues.includes(el.type)) {
            return el
        }
        else if (selectedValues.includes("250")) {

            return el.price <= 250
        }
        else if (selectedValues.includes("251")) {

            return (el.price >= 251 && el.price <= 450)
        }
        else if (selectedValues.includes("450")) {

            return el.price >= 450
        }

    })
    // console.log("filtered data" , result)
    return result
}

const searchDataHandler = (data, inputValues) => {

    let search_result = data.filter((el) => {
        if ((el.color == inputValues[0] && el.type == inputValues[1])) {
            return el
        }

    });
    console.log("searced data", search_result)
    return search_result.length ? search_result : data

}