import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { RcFile } from "antd/es/upload";
import { Label, PartialLabel } from "./types";
import { Labels } from "./components/labels";
import { FileUpload } from "./components/file-upload";
import { Name } from "./components/name";
import { Typography } from "antd";

// const props: UploadProps = {
//   beforeUpload: (file) => {
//     const isPNG = file.type === 'image/png';
//     if (!isPNG) {
//       message.error(`${file.name} is not a png file`);
//     }
//     return isPNG || Upload.LIST_IGNORE;
//   },
//   onChange: (info) => {
//     console.log(info.fileList);
//   },
// };

const STEP = {
  NAME: "name",
  FILE_UPLOAD: "file_upload",
  LABELS: "labels",
} as const;

const STEPS = Object.values(STEP);

type StepType = (typeof STEP)[keyof typeof STEP];

type ModuleProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BUTTON_TEXT_PER_STEP: Record<
  StepType,
  { cancelText: string; okText: string }
> = {
  [STEP.NAME]: {
    cancelText: "Cancelar",
    okText: "Siguiente",
  },
  [STEP.FILE_UPLOAD]: {
    cancelText: "Atrás",
    okText: "Siguiente",
  },
  [STEP.LABELS]: {
    cancelText: "Atrás",
    okText: "Confirmar",
  },
};

export const Module = (props: ModuleProps) => {
  const [step, setStep] = useState<StepType>("name");
  const [isModelDisabled, setIsModelDisabled] = useState(false);
  const [labelsFile, setLabelsFile] = useState<RcFile | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [content, setContent] = useState<{
    name: string;
    modelFile: RcFile | null;
    labels: PartialLabel[] | null;
  }>({
    name: "",
    modelFile: null,
    labels: [],
  });

  const renderStep = () => {
    switch (step) {
      case "name":
        return (
          <Name
            name={content.name}
            onIsInvalidChange={setIsInvalid}
            onNameChange={(name) => {
              setContent((previousContent) => ({ ...previousContent, name }));
            }}
          />
        );
      case "file_upload":
        return (
          <FileUpload
            isModelDisabled={isModelDisabled}
            labelsFile={labelsFile}
            modelFile={content.modelFile}
            onIsInvalidChange={setIsInvalid}
            onIsModelDisabledChange={(isModelDisabled) => {
              setIsModelDisabled(isModelDisabled);
              if (isModelDisabled) {
                setIsInvalid(false);
              }
            }}
            onLabelsContentChage={(labels) => {
              setContent((previousContent) => ({
                ...previousContent,
                labels,
              }));
            }}
            onLabelsFileChange={setLabelsFile}
            onModelFileChange={(modelFile) => {
              setContent((previousContent) => ({
                ...previousContent,
                modelFile,
              }));
            }}
          />
        );
      case "labels":
        return (
          <Labels
            labels={content.labels ?? []}
            isModelDisabled={isModelDisabled}
            onIsInvalidChange={setIsInvalid}
            onLabelsChange={(labels) => {
              setContent((previousContent) => ({
                ...previousContent,
                labels,
              }));
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    const currentIndex = STEPS.indexOf(step);
    const nextIndex = currentIndex + 1;

    if (nextIndex < STEPS.length) {
      setStep(STEPS[nextIndex]);
    }
  };

  const handlePreviousStep = () => {
    console.log("handlePreviousStep");
    const currentIndex = STEPS.indexOf(step);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex]);
    } else {
      props.onClose();
    }
  };

  console.log("content", JSON.stringify(content, null, 2));

  return (
    <Modal
      onClose={props.onClose}
      title={<Typography.Title level={3}>Nuevo módulo</Typography.Title>}
      centered
      open={props.isOpen}
      onOk={handleNextStep}
      okButtonProps={{
        disabled: isInvalid,
      }}
      onCancel={handlePreviousStep}
      {...BUTTON_TEXT_PER_STEP[step]}
    >
      {renderStep()}
    </Modal>
  );
};
