import request from '../utils/request';

export async function getApplyDateData () {
  return request('/mock/apply_date_data.json');
}

export async function getCategoriesChartData () {
  return request('/mock/categories_data.json');
}

export async function getTechChartData () {
  return request('/mock/tech_data.json');
}

export async function searchWithParams () {
  return request('/mock/apply_date_data.json');
}
