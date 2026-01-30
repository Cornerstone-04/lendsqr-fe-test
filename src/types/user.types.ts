export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  
  // Personal Information
  fullName: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  children: string;
  typeOfResidence: string;
  
  // Education and Employment
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  
  // User Tier and Balance
  userTier: 1 | 2 | 3;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  
  // Socials
  twitter: string;
  facebook: string;
  instagram: string;
  
  // Guarantor
  guarantor: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  };
}

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: UserStatus | '';
}
