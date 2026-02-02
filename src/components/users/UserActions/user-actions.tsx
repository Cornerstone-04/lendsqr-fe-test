import type { User } from "@/types/user.types";

interface UserActionsProps {
  status: User["status"];
  onStatusUpdate: (status: "Blacklisted" | "Active") => Promise<void>;
}

export const UserActions = ({ status, onStatusUpdate }: UserActionsProps) => {
  return (
    <div className="user-details__header">
      <h1 className="user-details__title">User Details</h1>

      <div className="user-details__actions">
        <button
          className="user-details__action-btn user-details__action-btn--danger"
          onClick={() => onStatusUpdate("Blacklisted")}
          disabled={status === "Blacklisted"}
          aria-label="Blacklist this user"
        >
          BLACKLIST USER
        </button>

        <button
          className="user-details__action-btn user-details__action-btn--success"
          onClick={() => onStatusUpdate("Active")}
          disabled={status === "Active"}
          aria-label="Activate this user"
        >
          ACTIVATE USER
        </button>
      </div>
    </div>
  );
};
