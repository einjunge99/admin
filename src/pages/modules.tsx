import { Button } from "../components/button";
import { PlusOutlined } from "@ant-design/icons";
import { CoursesTable } from "./components/course-table";
import { Module } from "./module";
import { useState } from "react";

export const Modules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <CoursesTable
          data={[
            {
              id: "1",
              title: "Primera prueba",
              isEnabled: true,
            },
            {
              id: "2",
              title: "Segunda prueba",
              isEnabled: false,
            },
            {
              id: "3",
              title: "Tercera prueba",
              isEnabled: true,
            },
            {
              id: "4",
              title: "Prueba prueba",
              isEnabled: true,
            },
          ]}
        />
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
