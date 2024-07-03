import { Button } from "../../components/button";
import { PlusOutlined } from "@ant-design/icons";
import { LecturesTable } from "../components/lectures-table";
import { LectureBuilder } from "../lecture-builder";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLectures } from "../../client/api";
import { BaseLayout } from "../../components/layout";

export const Lectures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lectures, isLoading } = useQuery({
    queryKey: ["lectures"],
    queryFn: getLectures,
  });

  return (
    <BaseLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Button
          style={{
            alignSelf: "end",
          }}
          type="primary"
          label="Agregar lección"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <LecturesTable data={lectures ?? []} isLoading={isLoading} />
      </div>
      <LectureBuilder
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </BaseLayout>
  );
};
