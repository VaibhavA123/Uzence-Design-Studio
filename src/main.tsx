import React, { useState } from "react";
import InputField from "./input";
import { DataTable, sampleUsers, userColumns } from "./datatable";


export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status?: string;
}


export default function ComponentDemo() {
    const [inputValue, setInputValue] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    description: "",
});

    const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

const simulateTableLoading = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
};

return (
    <div className="max-w-6xl mx-auto p-8 space-y-12 bg-gray-50 min-h-screen">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
            React Components Demo
        </h1>
        <p className="text-gray-600">
            InputField & DataTable components built with TypeScript & TailwindCSS
        </p>
    </div>


        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            InputField Component
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Basic Examples</h3>

            <InputField
                label="Username"
                placeholder="Enter your username"
                helperText="Must be at least 3 characters long"
                value={formData.username}
                onChange={handleInputChange("username")}
                showClearButton
            />

            <InputField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                variant="filled"
                value={formData.email}
                onChange={handleInputChange("email")}
                showClearButton
            />

            <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                showPasswordToggle
                value={formData.password}
                onChange={handleInputChange("password")}
            />
            </div>

            <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Variants & States</h3>

            <InputField
                label="Outlined (Default)"
                placeholder="Outlined variant"
                variant="outlined"
                size="md"
            />

            <InputField
                label="Ghost Variant"
                placeholder="Ghost variant"
                variant="ghost"
                size="md"
            />

            <InputField
                label="Error State"
                placeholder="This field has an error"
                invalid
                errorMessage="This field is required"
            />

            <InputField
                label="Loading State"
                placeholder="Loading..."
                loading
            />

            <InputField
                label="Disabled Field"
                placeholder="This field is disabled"
                disabled
                value="Disabled value"
            />
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField placeholder="Small size" size="sm" />
            <InputField placeholder="Medium size" size="md" />
            <InputField placeholder="Large size" size="lg" />
        </div>
        </section>


        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
            <div>
            <h2 className="text-2xl font-semibold text-gray-900">
                DataTable Component
            </h2>
            <p className="text-gray-600 mt-1">
                Interactive data table with sorting and selection
            </p>
            </div>
            <button
            onClick={simulateTableLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
            Test Loading
            </button>
        </div>

        {selectedUsers.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium">
                {selectedUsers.length} user
                {selectedUsers.length !== 1 ? "s" : ""} selected
            </p>
            <div className="mt-2 text-sm text-blue-600">
                {selectedUsers.map((user, index) => (
                <span key={user.id}>
                    {user.name}
                    {index < selectedUsers.length - 1 ? ", " : ""}
                </span>
                ))}
            </div>
            </div>
        )}

        <DataTable
            data={sampleUsers}
            columns={userColumns}
            loading={tableLoading}
            selectable
            onRowSelect={setSelectedUsers}
            className="mb-8"
        />

        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
            Features Demonstrated:
            </h3>
            <ul className="text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Column sorting (click column headers)
            </li>
            <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Row selection with checkboxes
            </li>
            <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Custom cell rendering (Status column)
            </li>
            <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Loading and empty states
            </li>
            <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Responsive design with horizontal scroll
            </li>
            </ul>
        </div>
    </section>

    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Technical Implementation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
                InputField Features
            </h3>
            <ul className="space-y-2 text-gray-600">
                <li>✓ TypeScript with comprehensive prop types</li>
                <li>✓ Three variants: outlined, filled, ghost</li>
                <li>✓ Three sizes: small, medium, large</li>
                <li>✓ Password toggle functionality</li>
                <li>✓ Clear button option</li>
                <li>✓ Loading state with spinner</li>
                <li>✓ Error and validation states</li>
                <li>✓ ARIA accessibility labels</li>
                <li>✓ Responsive design</li>
            </ul>
        </div>

            <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
                DataTable Features
            </h3>
            <ul className="space-y-2 text-gray-600">
                <li>✓ Generic TypeScript implementation</li>
                <li>✓ Column sorting with visual indicators</li>
                <li>✓ Single and multiple row selection</li>
                <li>✓ Custom cell rendering support</li>
                <li>✓ Loading state with spinner</li>
                <li>✓ Empty state handling</li>
                <li>✓ Responsive with horizontal scroll</li>
                <li>✓ ARIA table semantics</li>
                <li>✓ Hover effects and visual feedback</li>
            </ul>
            </div>
        </div>
    </section>
    </div>
    );
}
