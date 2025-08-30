import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type Column<T> = {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
    render?: (value: any, record: T, index: number) => React.ReactNode;
};

export type DataTableProps<T extends { id: string | number }> = {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selected: T[]) => void;
    className?: string;
};

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
    className = "",
}: DataTableProps<T>) {
const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
);
    const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
    } | null>(null);

const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];


        const aStr = aVal !== null && aVal !== undefined ? String(aVal) : "";
        const bStr = bVal !== null && bVal !== undefined ? String(bVal) : "";

        if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    return sorted;
}, [data, sortConfig]);

const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig((current) => {
    if (current?.key === column.dataIndex) {
        return current.direction === "asc"
            ? { key: column.dataIndex, direction: "desc" }
          : null;
        }
        return { key: column.dataIndex, direction: "asc" };
    });
    };

    const handleRowSelect = (id: string | number) => {
    if (!selectable) return;

    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
        newSelected.delete(id);
    } else {
        newSelected.add(id);
    }

    setSelectedRows(newSelected);

    const selectedData = sortedData.filter((row) => newSelected.has(row.id));
    onRowSelect?.(selectedData);
    };

    const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
        setSelectedRows(new Set());
        onRowSelect?.([]);
    } else {
        const allIds = new Set(sortedData.map((row) => row.id));
        setSelectedRows(allIds);
        onRowSelect?.(sortedData);
    }
    };

    if (loading) {
    return (
        <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
        >
        <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading data...</p>
        </div>
        </div>
    );
    }

    if (data.length === 0) {
    return (
        <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
        >
        <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
            <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">No data available</p>
            <p className="text-gray-400 text-sm mt-1">
            There are no records to display
            </p>
        </div>
        </div>
    );
    }

    return (
    <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" role="table">
            <thead className="bg-gray-50">
            <tr role="row">
                {selectable && (
                <th scope="col" className="px-6 py-3 text-left">
                    <input
                    type="checkbox"
                    checked={
                        selectedRows.size === sortedData.length &&
                        sortedData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all rows"
                    />
                </th>
                )}
                {columns.map((column) => (
                <th
                    key={column.key}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable
                        ? "cursor-pointer hover:bg-gray-100 select-none"
                        : ""
                    }`}
                    onClick={() => handleSort(column)}
                    role="columnheader"
                    aria-sort={
                    sortConfig?.key === column.dataIndex
                        ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                        : undefined
                    }
                >
                    <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && (
                        <div className="flex flex-col">
                        <ChevronUp
                            size={12}
                            className={`${
                            sortConfig?.key === column.dataIndex &&
                            sortConfig.direction === "asc"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                        />
                        <ChevronDown
                            size={12}
                            className={`-mt-1 ${
                            sortConfig?.key === column.dataIndex &&
                            sortConfig.direction === "desc"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                        />
                        </div>
                    )}
                    </div>
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
                <tr
                key={row.id}
                className={`hover:bg-gray-50 transition-colors ${
                    selectedRows.has(row.id) ? "bg-blue-50" : ""
                }`}
                role="row"
                >
                {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                    <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label={`Select row ${index + 1}`}
                    />
                    </td>
                )}
                {columns.map((column) => (
                    <td
                    key={`${row.id}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    role="gridcell"
                    >
                    {column.render
                        ? column.render(row[column.dataIndex], row, index)
                        : String(row[column.dataIndex] ?? "")}
                    </td>
                ))}
                </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
);
}
export const sampleUsers = [
{
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
},
{
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
},
{
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "Inactive",
},
{
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
},
{
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "Pending",
},
];

export const userColumns: Column<(typeof sampleUsers)[0]>[] = [
{ key: "id", title: "ID", dataIndex: "id", sortable: true },
{ key: "name", title: "Name", dataIndex: "name", sortable: true },
{ key: "email", title: "Email", dataIndex: "email", sortable: true },
{ key: "role", title: "Role", dataIndex: "role", sortable: true },
{
    key: "status",
    title: "Status",
    dataIndex: "status",
    sortable: true,
    render: (value) => (
        <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Active"
            ? "bg-green-100 text-green-800"
            : value === "Inactive"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
        >
        {value}
        </span>
    ),
},
];

export function Demo() {
    return (
    <div className="p-6">
        <DataTable
        data={sampleUsers}
        columns={userColumns}
        selectable
        onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
    </div>
    );
}
