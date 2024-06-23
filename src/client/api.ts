import axios, { AxiosInstance } from "axios";
import { Label } from "../pages/lecture-builder/types";
import { RcFile } from "antd/es/upload";
import { CONFIG } from "../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${CONFIG.API_URL}/api/v1`,
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

export type AddLecturePayload = Omit<Lecture, "id" | "modelUrl" | "labels"> & {
  model: RcFile | null;
  icon: RcFile;
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
