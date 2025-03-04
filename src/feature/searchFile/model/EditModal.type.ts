
export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UnapprovalData {
  id: string,
  approvalNumber: string;
  createdAt: string;
  suBusinessName: string;
  supplierBusinessNumber: string;
  ipBusinessName: string;
  receiverBusinessNumber: string;
  supplyAmount: string;
  imageUrl: string;
};