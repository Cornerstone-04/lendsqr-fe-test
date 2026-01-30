import { useEffect, useState } from "react";
import { getUserById, updateUserStatus } from "../../db/users.service";
import { useParams, useNavigate } from "react-router";
import type { User } from "../../types/user.types";
import { ArrowLeft, User as UserIcon, Star } from "lucide-react";
import "./user-details.scss";

const TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      
      try {
        const userData = await getUserById(id);
        setUser(userData || null);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleStatusChange = async (status: "Blacklisted" | "Active") => {
    if (!id || !user) return;

    try {
      await updateUserStatus(id, status);
      setUser({ ...user, status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const renderStars = (tier: number) => {
    return [1, 2, 3].map((i) => (
      <Star
        key={i}
        size={16}
        fill={i <= tier ? "#E9B200" : "none"}
        stroke="#E9B200"
        strokeWidth={1.5}
      />
    ));
  };

  if (loading) {
    return (
      <div className="user-details">
        <div className="user-details__loading">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details">
        <button
          className="user-details__back"
          onClick={() => navigate("/users")}
        >
          <ArrowLeft /> Back to Users
        </button>
        <div className="user-details__error">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-details" data-testid="user-details">
      <button
        className="user-details__back"
        onClick={() => navigate("/users")}
      >
        <ArrowLeft /> Back to Users
      </button>

      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        <div className="user-details__actions">
          <button
            className="user-details__action-btn user-details__action-btn--danger"
            onClick={() => handleStatusChange("Blacklisted")}
            disabled={user.status === "Blacklisted"}
          >
            BLACKLIST USER
          </button>
          <button
            className="user-details__action-btn user-details__action-btn--success"
            onClick={() => handleStatusChange("Active")}
            disabled={user.status === "Active"}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className="user-details__card">
        <div className="user-details__profile">
          <div className="user-details__avatar">
            <UserIcon />
          </div>

          <div className="user-details__name-section">
            <div className="user-details__name">{user.fullName}</div>
            <div className="user-details__id">{user.id}</div>
          </div>

          <div className="user-details__tier">
            <div className="user-details__tier-label">User's Tier</div>
            <div className="user-details__tier-stars">
              {renderStars(user.userTier)}
            </div>
          </div>

          <div className="user-details__balance">
            <div className="user-details__balance-amount">
              {user.accountBalance}
            </div>
            <div className="user-details__balance-bank">
              {user.accountNumber}/{user.bankName}
            </div>
          </div>
        </div>

        <div className="user-details__tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`user-details__tab ${
                activeTab === i ? "user-details__tab--active" : ""
              }`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 0 && (
        <div className="user-details__card">
          <div className="user-details__content">
            {/* Personal Information */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">
                Personal Information
              </h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__label">Full Name</div>
                  <div className="user-details__value">{user.fullName}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Phone Number</div>
                  <div className="user-details__value">{user.phoneNumber}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Email Address</div>
                  <div className="user-details__value">{user.email}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">BVN</div>
                  <div className="user-details__value">{user.bvn}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Gender</div>
                  <div className="user-details__value">{user.gender}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Marital Status</div>
                  <div className="user-details__value">
                    {user.maritalStatus}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Children</div>
                  <div className="user-details__value">{user.children}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Type of Residence</div>
                  <div className="user-details__value">
                    {user.typeOfResidence}
                  </div>
                </div>
              </div>
            </div>

            {/* Education and Employment */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">
                Education and Employment
              </h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__label">Level of Education</div>
                  <div className="user-details__value">
                    {user.levelOfEducation}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Employment Status</div>
                  <div className="user-details__value">
                    {user.employmentStatus}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Sector of Employment</div>
                  <div className="user-details__value">
                    {user.sectorOfEmployment}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">
                    Duration of Employment
                  </div>
                  <div className="user-details__value">
                    {user.durationOfEmployment}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Office Email</div>
                  <div className="user-details__value">{user.officeEmail}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Monthly Income</div>
                  <div className="user-details__value">
                    {user.monthlyIncome}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Loan Repayment</div>
                  <div className="user-details__value">
                    {user.loanRepayment}
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">Socials</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__label">Twitter</div>
                  <div className="user-details__value">{user.twitter}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Facebook</div>
                  <div className="user-details__value">{user.facebook}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Instagram</div>
                  <div className="user-details__value">{user.instagram}</div>
                </div>
              </div>
            </div>

            {/* Guarantor */}
            <div className="user-details__section">
              <h3 className="user-details__section-title">Guarantor</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__label">Full Name</div>
                  <div className="user-details__value">
                    {user.guarantor.fullName}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Phone Number</div>
                  <div className="user-details__value">
                    {user.guarantor.phoneNumber}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Email Address</div>
                  <div className="user-details__value">
                    {user.guarantor.emailAddress}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__label">Relationship</div>
                  <div className="user-details__value">
                    {user.guarantor.relationship}
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      )}

      {activeTab !== 0 && (
        <div className="user-details__card">
          <div className="user-details__content">
            <p style={{ textAlign: "center", padding: "40px", color: "#545f7d" }}>
              This section is coming soon...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};