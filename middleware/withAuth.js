import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();

    let token;

    if (typeof window !== "undefined") {
      // Check if token is present in local storage or cookies
      token = localStorage.getItem("token");
    }

    if (!token) {
      if (typeof window !== "undefined") {
        router.push("/");
      }
      return null;
    }
    // Verify and decode token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decodedToken;
      // Pass userId to wrapped component as props
      return <WrappedComponent {...props} userId={userId} />;
    } catch (error) {
      console.error("Error verifying token:", error);
      router.push("/");
      return null;
    }
  };

  // Copy static methods like `getInitialProps` from the wrapped component to the wrapper
  if (WrappedComponent.getInitialProps) {
    Wrapper.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Wrapper;
}
