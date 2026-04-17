type Props = {
  onClose: () => void;
};

export default function AddLeaveModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Add Leave</h2>

        <input type="date" className="w-full border rounded-lg p-3" />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Add Leave
        </button>

        <button onClick={onClose} className="w-full text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
