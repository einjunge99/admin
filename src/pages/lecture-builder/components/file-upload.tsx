import { RcFile, UploadProps } from "antd/es/upload";
import { PartialLabel } from "../types";
import { useEffect } from "react";
import Papa from "papaparse";
import styles from "./file-upload.module.scss";
import Dragger from "antd/es/upload/Dragger";
import {
  RobotFilled,
  InfoCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Collapse, Popover, Switch, Typography } from "antd";
import { isArray } from "lodash";
import { v4 as uuidv4 } from "uuid";

type CsvLabel = { valor: string; etiqueta: string };

type FileUploadProps = {
  modelFile: RcFile | null;
  labelsFile: RcFile | null;
  isModelDisabled: boolean;
  onIsInvalidChange: (isInvalid: boolean) => void;
  onIsModelDisabledChange: (isModelDisabled: boolean) => void;
  onLabelsContentChage: (content: PartialLabel[] | null) => void;
  onModelFileChange: (file: RcFile | null) => void;
  onLabelsFileChange: (file: RcFile | null) => void;
};

// TODO: add validation 'looks like your file is empty'
export const FileUpload = ({ ...props }: FileUploadProps) => {
  useEffect(() => {
    if (props.isModelDisabled) {
      props.onIsInvalidChange(false);
    } else {
      props.onIsInvalidChange(!props.modelFile || !props.labelsFile);
    }
  }, [props.isModelDisabled, props.modelFile, props.labelsFile]);

  useEffect(() => {
    if (props.labelsFile) {
      getFileContent(props.labelsFile);
    } else {
      props.onLabelsContentChage(null);
    }
  }, [props.labelsFile]);

  const getFileContent = (file: RcFile) => {
    Papa.parse<CsvLabel>(file, {
      complete: (result) => {
        const labels: PartialLabel[] = result.data.map(
          ({ etiqueta, valor }) => ({
            key: uuidv4(),
            label: etiqueta,
            value: +valor,
          })
        );
        props.onLabelsContentChage(labels);
      },
      header: true, // Set to false if your CSV doesn't have a header row
    });
  };

  const modelUploadProps: UploadProps = {
    accept: ".h5",
    listType: "picture",
    onRemove: () => {
      props.onModelFileChange(null);
    },
    beforeUpload: (file) => {
      props.onModelFileChange(file);
      return false;
    },
    fileList: props.modelFile ? [props.modelFile] : [],
  };

  const labelsUploadProps: UploadProps = {
    accept: ".csv",
    listType: "picture",
    onRemove: () => {
      props.onLabelsFileChange(null);
    },
    beforeUpload: (file) => {
      props.onLabelsFileChange(file);
      return false;
    },
    fileList: props.labelsFile ? [props.labelsFile] : [],
  };

  const data = [
    { value: 0, label: "Clase 1" },
    { value: 1, label: "Clase 2" },
  ];

  const genExtra = () => <Switch checked={!props.isModelDisabled} />;

  return (
    <>
      <Typography.Title level={5}>
        Paso 2: Carga de modelo y etiquetas
      </Typography.Title>
      <Collapse
        defaultActiveKey={props.isModelDisabled ? [] : ["file-upload"]}
        expandIconPosition="end"
        onChange={(keys) => {
          if (isArray(keys)) {
            props.onIsModelDisabledChange(keys.length === 0);
          }
        }}
        items={[
          {
            key: "file-upload",
            showArrow: false,
            extra: genExtra(),
            label: props.isModelDisabled
              ? "Tengo un modelo para cargar"
              : "No tengo un modelo para cargar",
            children: (
              <div className={styles["file-upload"]}>
                <div>
                  <Dragger {...modelUploadProps}>
                    <p className="ant-upload-drag-icon">
                      <RobotFilled />
                    </p>
                    <p className="ant-upload-text">Modelo de reconocmiento</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popover
                        content={
                          <Typography.Paragraph copyable>
                            https://teachablemachine.withgoogle.com/train/image
                          </Typography.Paragraph>
                        }
                        title="¿Cómo puedo construir mi primer modelo?"
                      >
                        <p className="ant-upload-hint">
                          Sube el modelo en formato .h5 de Keras{" "}
                          <InfoCircleOutlined color="#ffff00" />
                        </p>
                      </Popover>
                    </div>
                  </Dragger>
                </div>
                <div>
                  <Dragger {...labelsUploadProps}>
                    <p className="ant-upload-drag-icon">
                      <UnorderedListOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Etiquetas de clasificación
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popover
                        content={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <table className={styles["preview-table"]}>
                              <thead>
                                <tr>
                                  <th>valor</th>
                                  <th>etiqueta</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr key={index}>
                                    <td>{row.value}</td>
                                    <td>{row.label}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        }
                        title="¿Qué formato tiene que tener mi archivo de etiquetas?"
                      >
                        <p className="ant-upload-hint">
                          Sube el archivo de etiquetas en formato .csv{" "}
                          <InfoCircleOutlined color="#ffff00" />
                        </p>
                      </Popover>
                    </div>
                  </Dragger>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
