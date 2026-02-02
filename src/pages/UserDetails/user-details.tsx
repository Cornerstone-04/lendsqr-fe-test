import { useEffect, useState } from "react";
import { getUserById, updateUserStatus } from "@/db/users.service";
import { useParams, useNavigate } from "react-router";
import type { User } from "@/types/user.types";
import {
  GeneralDetailsTab,
  ProfileSummary,
  UserActions,
} from "@/components/users";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
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
      setTimeout(() => {
        toast.success(`${user.fullName} is now ${status.toLocaleLowerCase()}.`);
      }, 1000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
      <button className="user-details__back" onClick={() => navigate("/users")}>
        <ArrowLeft /> Back to Users
      </button>

      <UserActions status={user.status} onStatusUpdate={handleStatusChange} />

      <ProfileSummary
        user={user}
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="user-details__card">
        {activeTab === 0 ? (
          <GeneralDetailsTab user={user} />
        ) : (
          <div className="user-details__coming-soon">
            This section is coming soon...
          </div>
        )}
      </div>
    </div>
  );
};
