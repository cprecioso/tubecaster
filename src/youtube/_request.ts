import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_KEY } from "../_config"

const api = axios.create({
  method: "get",
  baseURL: "https://www.googleapis.com/youtube/v3",
  responseType: "json",
  params: { key: API_KEY }
})

export type Response<T = any> = AxiosResponse<T>
export type RequestConfig = AxiosRequestConfig

export function get<T>(url: string, params: any): Promise<Response<T>> {
  return api.get<T>(url, { params })
}

export function request<T>(config: RequestConfig): Promise<Response<T>> {
  return api.request<T>(config)
}
