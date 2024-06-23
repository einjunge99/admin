import {
  Table as AntdTable,
  TableProps as AntdTableProps,
  ConfigProvider,
} from "antd";
import { RenderEmptyHandler } from "antd/es/config-provider";
import { ColumnType } from "antd/es/table";
// import styles from "./styles.module.scss";

export type TableProps<T> = {
  data: T[];
  columns: (ColumnType<T> & { editable?: boolean; placeholder?: string })[];
  emptyComponent?: RenderEmptyHandler;
} & Omit<AntdTableProps, "dataSource" | "columns">;

export const Table = <T extends object>({
  data,
  columns,
  pagination = false,
  emptyComponent,
  ...props
}: TableProps<T>) => {
  return (
    <ConfigProvider
      renderEmpty={emptyComponent}
      theme={{
        components: {
          Table: {
            headerBg: "#cccccc",
          },
        },
      }}
    >
      <AntdTable
        {...props}
        dataSource={data}
        columns={columns}
        pagination={pagination}
      />
    </ConfigProvider>
  );
};
