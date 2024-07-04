import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { RcFile } from "antd/es/upload";
import { PartialLabel } from "./types";
import { Labels } from "./components/labels";
import { FileUpload } from "./components/file-upload";
import { Lecture } from "./components/lecture";
import { Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLecture } from "../../client/api";
import { useNotification } from "../../providers/notification";

const STEP = {
  LECTURE: "lecture",
  FILE_UPLOAD: "file_upload",
  LABELS: "labels",
} as const;

const STEPS = Object.values(STEP);

type StepType = (typeof STEP)[keyof typeof STEP];

type LectureProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BUTTON_TEXT_PER_STEP: Record<
  StepType,
  { cancelText: string; okText: string }
> = {
  [STEP.LECTURE]: {
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

const DEFAULT_CONTENT = {
  iconFile: null,
  title: "",
  modelFile: null,
  labels: [],
};

export const LectureBuilder = (props: LectureProps) => {
  const context = useNotification();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<StepType>("lecture");
  const [isModelDisabled, setIsModelDisabled] = useState(false);
  const [labelsFile, setLabelsFile] = useState<RcFile | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [content, setContent] = useState<{
    iconFile: RcFile | null;
    title: string;
    modelFile: RcFile | null;
    labels: PartialLabel[] | null;
  }>(DEFAULT_CONTENT);

  const addLectureMutation = useMutation({
    mutationFn: addLecture,
    onSuccess: () => {
      context?.notify(
        {
          message: "Leccción creada exitósamente",
        },
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      props.onClose();
    },
    onError: () => {
      context?.notify(
        {
          message: "Algo salió mal...",
          description: "Por favor, vuelve a intentar en unos minutos",
        },
        "error"
      );
    },
  });

  const renderStep = () => {
    switch (step) {
      case "lecture":
        return (
          <Lecture
            iconFile={content.iconFile}
            title={content.title}
            onIsInvalidChange={setIsInvalid}
            onIconFileChange={(iconFile) => {
              setContent((previousContent) => ({
                ...previousContent,
                iconFile,
              }));
            }}
            onTitleChange={(title) => {
              setContent((previousContent) => ({ ...previousContent, title }));
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
    } else {
      const { modelFile, iconFile } = content;
      if (!iconFile) {
        // TODO: handle case, but this is highly unlikely to happen.
        return;
      }
      addLectureMutation.mutate({
        ...content,
        model: modelFile,
        icon: iconFile,
        labels: JSON.stringify(content.labels),
      });
    }
  };

  const handleClose = () => {
    setIsModelDisabled(false);
    setContent(DEFAULT_CONTENT);
    setStep("lecture");
    setLabelsFile(null);
    setIsInvalid(false);
    props.onClose();
  };

  const handlePreviousStep = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.currentTarget.id) {
      const currentIndex = STEPS.indexOf(step);
      const prevIndex = currentIndex - 1;

      if (prevIndex >= 0) {
        setStep(STEPS[prevIndex]);
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      onClose={props.onClose}
      title={<Typography.Title level={3}>Nueva lección</Typography.Title>}
      centered
      open={props.isOpen}
      onOk={handleNextStep}
      destroyOnClose
      cancelButtonProps={{
        id: "close-button",
      }}
      okButtonProps={{
        disabled: isInvalid,
        loading: addLectureMutation.isPending,
      }}
      onCancel={handlePreviousStep}
      {...BUTTON_TEXT_PER_STEP[step]}
    >
      {renderStep()}
    </Modal>
  );
};
