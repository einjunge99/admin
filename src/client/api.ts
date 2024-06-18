import axios, { AxiosInstance } from "axios";
import { Label, PartialLabel } from "../pages/module/types";
import { RcFile } from "antd/es/upload";

const API_URL = "http://0.0.0.0:8080/api/";

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