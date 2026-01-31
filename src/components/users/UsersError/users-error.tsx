export const UsersError = ({ error }: { error: Error }) => (
  <div className="users-page">
    <h1 className="users-page__title">Users</h1>
    <div className="users-page__error">
      <p>Error loading users: {error.message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  </div>
);
