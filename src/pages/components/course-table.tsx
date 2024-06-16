import { Table, TableProps } from "../../components/table";

type Course = {
  id: string;
  title: string;
  isEnabled: boolean;
};

type CoursesTableProps = {
  data: Course[];
};

// Renderizar estado como toggle
export const CoursesTable = (props: CoursesTableProps) => {
  const columns: TableProps<Course>["columns"] = [
    {
      title: "Título",
      dataIndex: "title",
    },
    {
      title: "Estado",
      dataIndex: "isEnabled",
      render: (isEnabled) => {
        return isEnabled ? "Habilitado" : "Deshabilitado";
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={props.data}
      onRow={() => {
        return {
          onClick: (event) => {
            console.log("clicked");
          }, // click row
        };
      }}
    />
  );
};
