export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  createdAt: string;

  // details page fields
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
  educationLevel: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  monthlyIncome: string;
  loanRepayment: string;
}