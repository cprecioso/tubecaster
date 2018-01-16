import axios, { AxiosResponse, AxiosPromise, AxiosRequestConfig } from "axios";
import { PaginatedResponse } from "./_types";

export default function request<T = any>(url: string, params: any = {}) {
  return axios.get<T>(url, { responseType: "json", params });
}

export async function unpaginatedRequest<T = any>(
  url: string,
  params: any = {},
  limit = 0
) {
  const perPage = limit > 0 && limit <= 50 ? limit : 50;
  const reqParams = { ...params, maxResults: perPage };
  const firstResponsePromise = request<PaginatedResponse<T>>(url, reqParams);
  const firstResponse = await firstResponsePromise;
  const numberOfItems = limit || firstResponse.data.pageInfo.totalResults;
  const numberOfPages = Math.ceil(numberOfItems / perPage);
  const allPages = requestAllPages(firstResponsePromise, numberOfPages);
  return { firstResponse, items: getAllItems(allPages, numberOfItems) };
}

async function* getAllItems<T>(
  responsePromises: Promise<AxiosResponse<PaginatedResponse<T>> | null>[],
  n: number
) {
  let i = 0;
  for (const responsePromise of responsePromises) {
    const response = await responsePromise;
    if (response == null) break;
    for (const item of response.data.items) {
      yield item;
      if (++i >= n) return;
    }
  }
}

function requestAllPages<T>(
  responsePromise: AxiosPromise<PaginatedResponse<T>>,
  n: number
) {
  const responses: Promise<AxiosResponse<PaginatedResponse<T>> | null>[] = [
    Promise.resolve(responsePromise)
  ];
  while (--n) {
    const lastResponse = responses[responses.length - 1];
    const newResponse = lastResponse.then(res => {
      if (res && res.data && res.data.nextPageToken) {
        const newConfig: AxiosRequestConfig = {
          ...res.config,
          params: { ...res.config.params, pageToken: res.data.nextPageToken }
        };
        return axios(res.config) as AxiosPromise<PaginatedResponse<T>>;
      } else {
        return Promise.resolve(null);
      }
    });
    responses.push(newResponse);
  }
  return responses;
}
