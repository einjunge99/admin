import { Alert, Divider, Typography } from "antd";
import { Button } from "../../../components/button";
import { Table, TableProps } from "../../../components/table";
import { Label, PartialLabel } from "../types";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "antd/es/typography/Link";
import { EditableRow } from "./table/editable-row";
import { EditableCell } from "./table/editable-cell";

// https://www.reddit.com/r/webdev/comments/eejh52/websites_i_use_for_free_svg_illustrations/

type LabelsProps = {
  isModelDisabled: boolean;
  labels: PartialLabel[];
  onIsInvalidChange: (isInvalid: boolean) => void;
  onLabelsChange: (labels: PartialLabel[]) => void;
};

// TODO: validate step, require min 5 labels in total
export const Labels = (props: LabelsProps) => {
  const [error, setError] = useState<string | null>(null);

  const extraLabels = useMemo(() => {
    return props.labels.filter((label) => label.value === undefined);
  }, [props.labels]);

  const modelLabels = useMemo(() => {
    return props.labels.filter((label) => label.value !== undefined);
  }, [props.labels]);

  useEffect(() => {
    const validateLabels = (
      labels: Partial<Label>[],
      requiredFields: (keyof Label)[]
    ) =>
      labels.some((label) =>
        requiredFields.some((field) => label[field] === undefined)
      );

    let isInvalid = extraLabels.length + modelLabels.length < 5;

    if (isInvalid) {
      setError("Al menos cinco etiquetas son requeridas para crear un módulo");
    } else {
      isInvalid =
        validateLabels(extraLabels, ["label", "url"]) ||
        (!props.isModelDisabled &&
          validateLabels(modelLabels, ["label", "url", "value"]));

      if (isInvalid) {
        setError("Completa todos los campos requeridos");
      }
    }

    if (!isInvalid) setError(null);

    props.onIsInvalidChange(isInvalid);
  }, [extraLabels, modelLabels, props.isModelDisabled]);

  const modelLabelColumns: TableProps<PartialLabel>["columns"] = [
    {
      title: "Valor",
      dataIndex: "value",
      width: 10,
    },
    {
      title: "Etiqueta",
      dataIndex: "label",
    },
    {
      title: "Url",
      dataIndex: "url",
      editable: true,
      placeholder: "ID del video",
      width: 200,
    },
  ];

  const secondColumns: TableProps<PartialLabel>["columns"] = [
    {
      title: "Etiqueta",
      dataIndex: "label",
      editable: true,
      placeholder: "Nombre de la etiqueta",
    },
    {
      title: "Url",
      dataIndex: "url",
      editable: true,
      placeholder: "ID del video",
      width: 200,
    },
    {
      title: "",
      key: "action",
      width: 10,
      render: (_, { key }) => {
        return (
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(key)}
          />
        );
      },
    },
  ];

  const handleDelete = (key: PartialLabel["key"]) => {
    const newDataSource = props.labels.filter((item) => item.key !== key);
    props.onLabelsChange(newDataSource);
  };

  const handleAdd = () => {
    const newData: PartialLabel = {
      key: uuidv4(),
    };
    props.onLabelsChange([...props.labels, newData]);
  };

  const handleSave = (row: PartialLabel) => {
    const newData = [...props.labels];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    props.onLabelsChange(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns1 = modelLabelColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: PartialLabel) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title?.toString(),
        placeholder: col.placeholder,
        handleSave,
      }),
    };
  });

  const columns2 = secondColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: PartialLabel) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title?.toString(),
        placeholder: col.placeholder,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Divider orientation="right">
        {props.isModelDisabled ? (
          <Typography.Text style={{ fontSize: "16px" }} type="secondary">
            Etiquetas de modelo (deshabilitadas)
          </Typography.Text>
        ) : (
          "Etiquetas de modelo"
        )}
      </Divider>
      {!props.isModelDisabled && (
        <Table
          components={components}
          data={modelLabels}
          columns={columns1}
          emptyComponent={() => {
            return (
              <h1>Hello</h1>
              // TODO: Agregar warning, de que el archivo que subió no tiene nada, regresar al anterior paso
              // E intentar de nuevo....
            );
          }}
        />
      )}
      <Divider orientation="right">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Etiquetas adicionales
          <Button
            style={{ alignSelf: "end" }}
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleAdd}
          />
        </div>
      </Divider>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Table<PartialLabel>
          components={components}
          data={extraLabels}
          columns={columns2}
          emptyComponent={() => {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text>Está muy vació por aquí...</Typography.Text>
                <div>
                  <Typography.Text type="secondary">
                    (Intenta agregando una{" "}
                  </Typography.Text>
                  <Link onClick={handleAdd}>nueva etiqueta)</Link>
                </div>
              </div>
            );
          }}
        />
      </div>
      {error && <Alert message={error} style={{ marginTop: 8 }} type="error" />}
    </div>
  );
};
