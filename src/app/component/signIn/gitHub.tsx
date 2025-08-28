"use server";
import { redirect } from "next/dist/server/api-utils";
import { signIn, signOut } from "../../../../auth";
// import { useRouter } from "next/navigation";
export const login = async () => {
  // const router = useRouter();
  await signIn("github", { redirectTo: "/dashboard" });
  // router.push("/dashboard");
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

// export default function SignIn() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("github");
//       }}
//     >
//       <button type="submit">Signin with GitHub</button>
//     </form>
//   );
// }
