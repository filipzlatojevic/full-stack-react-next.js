"use client";
import React from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.input}
          placeholder="email"
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="password"
          required
        />
        <button className={styles.button}>Login</button>
      </form>

      <button onClick={() => signIn("google")} className={styles.google}>
        Login with Google
      </button>
      <div>
        Don&apos;t have an account?{" "}
        <Link className={styles.link} href="/dashboard/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
