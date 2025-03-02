export interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}
  
export interface ApprovalData {
  id: string;
  provider: string;
  approvalNumber: string;
  date: string;
  providerName: string;
  providerReg: string;
  receiverName: string;
  receiverReg: string;
  supplyAmount: string;
  taxAmount: string;
  totalAmount: string;
  statusMessage: string;
}