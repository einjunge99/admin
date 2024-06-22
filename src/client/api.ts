import axios, { AxiosInstance } from "axios";
import { Label, PartialLabel } from "../pages/lecture-builder/types";
import { RcFile } from "antd/es/upload";

const API_URL = "http://0.0.0.0:8080/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export type Lecture = {
  id: number;
  title: string;
  modelUrl?: string;
  labels: Label[];
};

export const getLectures = async (): Promise<Lecture[]> => {
  const { data } = await axiosInstance.get<Lecture[]>("/lectures");
  return data;
};

export type AddLecturePayload = Omit<Lecture, "id" | "modelUrl"> & {
  model: RcFile | null;
  labels: string;
};

export const addLecture = async (
  lecture: AddLecturePayload
): Promise<Lecture> => {
  const { data } = await axiosInstance.postForm<Lecture>("/lectures", lecture);
  return data;
};

// TODO: type response
export const getUser = async (userId: string) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};
