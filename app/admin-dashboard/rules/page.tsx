"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  role: string;
  email: string;
  lastLogin: string;
}

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "Sana A.",
      role: "Super Admin",
      email: "sana@supershopper.com",
      lastLogin: "09 Nov 2025",
    },
    {
      id: 2,
      name: "Ali R.",
      role: "Admin",
      email: "ali@supershopper.com",
      lastLogin: "09 Nov 2025",
    },
    {
      id: 3,
      name: "Ayesha K.",
      role: "Support Manager",
      email: "ayesha@supershopper.com",
      lastLogin: "08 Nov 2025",
    },
    {
      id: 4,
      name: "Hassan M.",
      role: "Moderator",
      email: "hassan@supershopper.com",
      lastLogin: "08 Nov 2025",
    },
  ]);

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-[#2723FF] text-white";
      case "Admin":
        return "bg-slate-300 text-slate-800";
      case "Support Manager":
        return "bg-slate-300 text-blue-600";
      case "Moderator":
        return "bg-slate-300 text-blue-600";
      default:
        return "bg-slate-300 text-slate-800";
    }
  };

  const handleEdit = (id: number) => {
    console.log("Edit admin:", id);
  };

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="min-h-screen  text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Admins</h1>
          <p className="text-slate-400 text-lg">
            Assign Roles And Control Access Securely.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#2723FF] hover:bg-blue-700 px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-600/30">
          Add New Admin
          <Plus className="w-5 h-5" />
        </button>
      </div>
      {/* Admin Users Section */}
      <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Admin Users</h2>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div
            className="
      hidden 
      sm:grid 
      grid-cols-5 
      gap-4 
      mb-4 
      px-6 
      py-4 
      text-sm
    "
          >
            <div className="text-slate-400 font-medium">Admin Name</div>
            <div className="text-slate-400 font-medium">Role</div>
            <div className="text-slate-400 font-medium">Email</div>
            <div className="text-slate-400 font-medium">Last Login</div>
            <div className="text-slate-400 font-medium">Actions</div>
          </div>

          {/* Table Rows */}
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="
          grid 
          grid-cols-1 
          sm:grid-cols-3 
          md:grid-cols-5 
          gap-4 
          px-4 sm:px-6 
          py-5 
          bg-slate-900/30 
          rounded-2xl 
          mb-3 
          hover:bg-slate-900/50 
          transition-all
        "
            >
              {/* Mobile label + value */}
              <div>
                <span className="sm:hidden text-slate-400 text-sm">
                  Admin Name:
                </span>
                <p className="text-white font-medium">{admin.name}</p>
              </div>

              <div>
                <span className="sm:hidden text-slate-400 text-sm">Role:</span>
                <span
                  className={`inline-block md:ml-5 px-4 py-2 rounded-full text-sm font-medium ${getRoleBadgeStyle(
                    admin.role
                  )}`}
                >
                  {admin.role}
                </span>
              </div>

              <div>
                <span className="sm:hidden text-slate-400 text-sm">Email:</span>
                <p className="text-slate-300 break-all">{admin.email}</p>
              </div>

              <div>
                <span className="sm:hidden text-slate-400 text-sm">
                  Last Login:
                </span>
                <p className="text-slate-300">{admin.lastLogin}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(admin.id)}
                  className="bg-slate-700/50 hover:bg-slate-700 p-2 sm:p-2.5 rounded-full transition-all"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="bg-slate-700/50 hover:bg-slate-700 p-2 sm:p-2.5 rounded-full transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      `
    </div>
  );
};

export default ManageAdmins;
