export type Props = {
  onDataUpdate: (stepNumber: number, data: { deduct_value: number }) => void;
  meassuredLength: string;
  meassuredWidth: string;
  meassuredArea: number;
};
