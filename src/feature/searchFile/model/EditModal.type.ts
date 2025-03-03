
export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UnapprovalData {
  id: string,
  approvalNumber: string;
  createdAt: string;
  supplierName: string;
  supplierBusinessNumber: string;
  receiverName: string;
  receiverBusinessNumber: string;
  supplyAmount: string;
  imageUrl: string;
};