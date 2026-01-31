import React from "react";
import type { User } from "../../../types/user.types";
import { InfoSection } from "../../common/InfoSection/info-section";

export const GeneralDetailsTab = ({ user }: { user: User }) => {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", value: user.fullName },
        { label: "Phone Number", value: user.phoneNumber },
        { label: "Email Address", value: user.email },
        { label: "BVN", value: user.bvn },
        { label: "Gender", value: user.gender },
        { label: "Marital Status", value: user.maritalStatus },
        { label: "Children", value: user.children },
        { label: "Type of Residence", value: user.typeOfResidence },
      ],
    },
    {
      title: "Education and Employment",
      fields: [
        { label: "Level of Education", value: user.levelOfEducation },
        { label: "Employment Status", value: user.employmentStatus },
        { label: "Sector of Employment", value: user.sectorOfEmployment },
        { label: "Duration of Employment", value: user.durationOfEmployment },
        { label: "Office Email", value: user.officeEmail },
        { label: "Monthly Income", value: user.monthlyIncome },
        { label: "Loan Repayment", value: user.loanRepayment },
      ],
    },
    {
      title: "Socials",
      fields: [
        { label: "Twitter", value: user.twitter },
        { label: "Facebook", value: user.facebook },
        { label: "Instagram", value: user.instagram },
      ],
    },
    {
      title: "Guarantor",
      fields: [
        { label: "Full Name", value: user.guarantor.fullName },
        { label: "Phone Number", value: user.guarantor.phoneNumber },
        { label: "Email Address", value: user.guarantor.emailAddress },
        { label: "Relationship", value: user.guarantor.relationship },
      ],
    },
  ];

  return (
    <div className="user-details__content">
      {sections.map((section, index) => (
        <React.Fragment key={section.title}>
          <InfoSection title={section.title} fields={section.fields} />
          {index < sections.length - 1 && <hr className="user-details__section-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};
