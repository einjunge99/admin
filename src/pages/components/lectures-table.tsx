import { Lecture } from "../../client/api";
import { Table, TableProps } from "../../components/table";

type LecturesTableProps = {
  data: Lecture[];
  isLoading: boolean;
};

// TODO: render status as toggle
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
    <Table loading={props.isLoading} columns={columns} data={props.data} />
  );
};
