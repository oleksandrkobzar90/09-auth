export const dynamic = "force-dynamic";

import Image from "next/image";
import css from "@/components/Profile/Profile.module.css";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const user = await getServerMe();

    return {
      title: `Profile of ${user.username}`,
      description: `Information about profile ${user.username}`,
      openGraph: {
        title: `Profile of ${user.username}`,
        description: `Information about profile ${user.username}`,
        url: `/profile`,
        siteName: "NoteHub",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "profile",
          },
        ],
        type: "profile",
      },
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return {
      title: "Profile",
      description: "User profile page",
    };
  }
}

const Profile = async () => {
  let user = null;
  try {
    user = await getServerMe();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit/" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
