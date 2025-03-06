export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  index: string | null;
  rowId: number | null;
};


export type ModalData = {
  code: number;
  message: string;
  result: {
    issueId: string;
    erDat: string;
    suName: string;
    suId: string;
    ipName: string;
    ipId: string;
    taxTotal: string;
    chargeTotal: string;
    grandTotal: string;
    processStatus: "UNAPPROVED" | "APPROVED" | "REJECTED";
    url: string;
  };
  success: boolean;
};
  