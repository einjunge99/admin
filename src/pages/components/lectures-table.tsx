import { Lecture } from "../../client/api";
import { Table, TableProps } from "../../components/table";

type LecturesTableProps = {
  data: Lecture[];
};

// Renderizar estado como toggle
export const LecturesTable = (props: LecturesTableProps) => {
  const columns: TableProps<Lecture>["columns"] = [
    {
      title: "Título",
      dataIndex: "title",
    },
    // {
    //   title: "Estado",
    //   dataIndex: "isEnabled",
    //   render: (isEnabled) => {
    //     return isEnabled ? "Habilitado" : "Deshabilitado";
    //   },
    // },
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
