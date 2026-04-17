type Props = {
  status: "active" | "expired" | "paused";
};

const CouponStatusBadge = ({ status }: Props) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    expired: "bg-red-100 text-red-700",
    paused: "bg-yellow-100 text-yellow-700",
  };

  const labels = {
    active: "Active",
    expired: "Expired",
    paused: "Paused",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default CouponStatusBadge;
