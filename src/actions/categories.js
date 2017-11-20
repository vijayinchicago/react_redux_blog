import * as API from '../utils/API'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export const loadCategories = (categories) =>{
	return {
		type: GET_ALL_CATEGORIES,
		categories
	}
}
export const getAllCategories = () => dispatch => {
	API.getAllCategories().then(res => {
		const cats =res.categories
		dispatch(loadCategories(cats))
		})
}