import Register from "@/components/Register";
import { withSessionProtection } from "@/utils/auth";
import Link from "next/link";

export const getServerSideProps = withSessionProtection(async (context) => {
  const { session } = context; // Access session data here

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        user: {
          id: session.id,
          name: session.username, // Ensure this aligns with your session structure
        },
      },
    },
  };
});

interface HomeProps {
  session: {
    user: {
      id: string;
      name: string;
    };
  };
}

export default function Home({ session }: HomeProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div>
        <h1>Welcome back, {`${session.user.name} (${session.user.id})`}</h1>
        <Link href="/dashboard">Go Chat!</Link>
      </div>
    </main>
  );
}
