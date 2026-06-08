import Image from "next/image";
import css from "@/components/Profile/Profile.module.css";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

const Profile = async () => {
  let user = null;
  try {
    user = await getMe();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  if (!user) redirect("/login");

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
