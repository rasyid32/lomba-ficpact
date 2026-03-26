"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { userAPI } from "@/lib/api";
import { User, Lock, Award, Moon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SettingsPage() {
  const { user, login } = useAuth(); // assuming login/refresh could refresh user logic if needed, but we can window.location.reload()
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile State
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState((user as any)?.bio || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      await userAPI.updateSettings({ fullName, bio });
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to update profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      if (newPassword.length < 6) throw new Error("Password must be at least 6 characters");
      await userAPI.updateSettings({ oldPassword, newPassword });
      setMessage({ text: "Password changed successfully!", type: "success" });
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to change password", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTheme = async (enabled: boolean) => {
    if (!ownsDarkTheme) {
      setMessage({ text: "You must purchase the Dark Theme first in the Coin Shop!", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await userAPI.updateSettings({ darkThemeEnabled: enabled });
      setMessage({ text: "Theme updated! Reloading...", type: "success" });
      setTimeout(() => window.location.reload(), 500);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to update theme", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  // Determine purchased badges and theme
  const purchases = user.purchases || [];
  const badges = purchases.filter((p: any) => p.item.category === "BADGE");
  const ownsDarkTheme = purchases.some((p: any) => p.item.name === "Dark Theme");
  const darkThemeEnabled = user.darkThemeEnabled || false;

  const tabs = [
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "badges", label: "Badge Collection", icon: Award },
    { id: "theme", label: "Appearance", icon: Moon },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account, collection, and platform appearance.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message.text}
            </div>
          )}

          {activeTab === "profile" && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" disabled value={user.username} className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <button disabled={loading} type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin inline mr-2" size={18} /> : null} Save Changes
              </button>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input required type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input required type="password" minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <button disabled={loading} type="submit" className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin inline mr-2" size={18} /> : null} Update Password
              </button>
            </form>
          )}

          {activeTab === "badges" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Your Badge Collection</h2>
              {badges.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <Award size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">You haven&apos;t earned any badges yet.</p>
                  <Link href="/dashboard/coin-shop" className="text-blue-600 hover:underline mt-2 inline-block">Visit Coin Shop</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {badges.map((p: any) => (
                    <div key={p.id} className="flex flex-col items-center p-4 border border-gray-100 bg-gray-50 rounded-2xl shadow-sm hover:shadow transition">
                      {p.item.icon.startsWith('/') ? (
                        <Image src={p.item.icon} alt={p.item.name} width={80} height={80} className="mb-4 drop-shadow-md" />
                      ) : (
                        <div className="text-6xl mb-4">{p.item.icon}</div>
                      )}
                      <p className="font-bold text-gray-900 text-center">{p.item.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Appearance Settings</h2>
              
              <div className="flex items-center justify-between p-6 bg-gray-50 border rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${ownsDarkTheme ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'}`}>
                    <Moon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dark Mode Elite</h3>
                    <p className="text-sm text-gray-500">
                      {ownsDarkTheme ? "A beautiful dark palette for night reading." : "Unlock this exclusive theme in the Coin Shop."}
                    </p>
                  </div>
                </div>
                
                {ownsDarkTheme ? (
                  <button 
                    onClick={() => handleToggleTheme(!darkThemeEnabled)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${darkThemeEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${darkThemeEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
                  </button>
                ) : (
                  <Link href="/dashboard/coin-shop" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Lock size={16} /> Unlock
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
