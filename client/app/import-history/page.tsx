"use client";

import { useEffect, useState } from "react";

interface ImportJob {
  _id: string;
  fileName?: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
  errorReason?: string;
  createdAt: string;
}

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState<ImportJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:4000/import-jobs");
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch import logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading import history...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-2xl w-11/12 md:w-3/4 p-6 border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">
          🧾 Import History
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="p-3 text-left border-b">File Name</th>
                <th className="p-3 text-left border-b">Import Date & Time</th>
                <th className="p-3 text-center border-b">Total</th>
                <th className="p-3 text-center border-b">New</th>
                <th className="p-3 text-center border-b">Updated</th>
                <th className="p-3 text-center border-b">Failed</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No import history available.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-green-50 transition-all duration-150"
                  >
                    <td className="p-3 border-b text-gray-800 font-medium">
                      {log.fileName || "Job Feed"}
                    </td>
                    <td className="p-3 border-b text-gray-600">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 border-b text-center font-semibold text-gray-800">
                      {log.totalFetched}
                    </td>
                    <td className="p-3 border-b text-center font-semibold text-green-600">
                      {log.newJobs}
                    </td>
                    <td className="p-3 border-b text-center font-semibold text-blue-600">
                      {log.updatedJobs}
                    </td>
                    <td className="p-3 border-b text-center font-semibold text-red-600">
                      {log.failedJobs}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
