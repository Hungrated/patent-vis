import request from '../utils/request';

export async function getOverviewData () {
  return request('/mock/overview_data.json');
}

export async function getTrendsData () {
  return request('/mock/trends_data.json');
}

export async function getCategoriesChartData () {
  return request('/mock/categories_data.json');
}

export async function getTechChartData () {
  return request('/mock/tech_data.json');
}

export async function searchWithParams () {
  return request('/mock/trends_data.json');
}
