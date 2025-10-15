"use client";

import EditProfile from "@/Components/EditProfileComp";
import { useParams } from "next/navigation";
import React from "react";

const EditProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return;
  return <EditProfile profileId={id} />;
};

export default EditProfilePage;
