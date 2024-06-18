import { Button } from "../components/button";
import { PlusOutlined } from "@ant-design/icons";
import { LecturesTable } from "./components/lectures-table";
import { Module } from "./module";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLectures } from "../client/api";

export const Lectures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: lectures,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["lectures"], queryFn: getLectures });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos.</p>;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Button
          style={{
            alignSelf: "end",
          }}
          label="Agregar curso"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <LecturesTable data={lectures ?? []} />
      </div>
      <Module
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
